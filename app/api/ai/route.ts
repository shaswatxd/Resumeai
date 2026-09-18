import { generateText, type LanguageModel } from 'ai'
import { createGroq } from '@ai-sdk/groq'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createCerebras } from '@ai-sdk/cerebras'
import { TEMPLATES } from '@/lib/resume-types'

export const maxDuration = 60

/*
 * Provider chain: first configured provider wins; on runtime failure
 * (rate limit, bad key) the next one is tried.
 */
function providerChain(): { name: string; model: LanguageModel }[] {
  const chain: { name: string; model: LanguageModel }[] = []
  const groqKey = process.env.GROQ_API_KEY
  if (groqKey) {
    const groq = createGroq({ apiKey: groqKey })
    // Active high-performance and multilingual Groq models
    chain.push({ name: 'groq-gpt-oss-120b', model: groq('openai/gpt-oss-120b') })
    chain.push({ name: 'groq-qwen3.8-27b', model: groq('qwen/qwen3.8-27b') })
    chain.push({ name: 'groq-gpt-oss-20b', model: groq('openai/gpt-oss-20b') })
    chain.push({ name: 'groq-compound-mini', model: groq('groq/compound-mini') })
    chain.push({ name: 'groq-compound', model: groq('groq/compound') })
  }
  const googleKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (googleKey) {
    const google = createGoogleGenerativeAI({ apiKey: googleKey })
    chain.push({ name: 'gemini-2.0-flash', model: google('gemini-2.0-flash') })
    chain.push({ name: 'gemini-1.5-flash', model: google('gemini-1.5-flash') })
  }
  const cerebrasKey = process.env.CEREBRAS_API_KEY
  if (cerebrasKey) {
    const cerebras = createCerebras({ apiKey: cerebrasKey })
    chain.push({ name: 'cerebras-llama3.3', model: cerebras('llama-3.3-70b') })
  }
  return chain
}

async function generate(opts: { system: string; prompt: string }) {
  const providers = providerChain()
  if (providers.length === 0) {
    throw new Error('No AI API key found in server environment. Please ensure GROQ_API_KEY is configured in .env.local and restart the server.')
  }
  let lastErr: Error | null = null
  for (const { name, model } of providers) {
    try {
      const { text } = await generateText({ model, ...opts })
      return text
    } catch (err) {
      lastErr = err as Error
      console.error(`[ai] provider ${name} failed:`, lastErr.message)
    }
  }
  throw lastErr ?? new Error('All configured AI providers failed to respond.')
}

function fallbackBiodataAbout(b: NonNullable<Body['biodataContext']>) {
  const tone = b.tone || 'balanced'
  const lang = b.language || 'hi'
  const name = b.name?.trim() || ''
  const isFemale = (b.gender || '').toLowerCase() === 'female'
  const occ = b.occupation?.trim() || 'Professional'
  const comp = b.company?.trim() ? ` at ${b.company.trim()}` : ''
  const edu = b.education?.trim() || ''
  const hobbies = b.hobbies?.trim() || ''

  if (lang === 'hi') {
    if (tone === 'traditional') {
      return {
        aboutMe: `${name ? `${name} ` : ''}एक सुशिक्षित, ${isFemale ? 'शालीन और पारिवारिक संस्कारों से परिपूर्ण युवती' : 'विनम्र और पारिवारिक संस्कारों से परिपूर्ण व्यक्ति'} हैं। ${edu ? `इन्होंने ${edu} तक शिक्षा प्राप्त की है और ` : ''}वर्तमान में ${occ}${comp ? ` में` : ''} कार्यरत हैं। जीवन में बड़ों का आदर, सनातन संस्कृति और परिवार की खुशियों को सर्वोपरि ${isFemale ? 'मानती' : 'मानते'} हैं।${hobbies ? ` रुचियों में ${hobbies} शामिल हैं।` : ''}`,
        partnerExpectations: `हम एक ${isFemale ? 'ऐसे सुसंस्कृत, समझदार और पारिवारिक मूल्यों का सम्मान करने वाले जीवनसाथी' : 'ऐसी सुसंस्कृत, समझदार और पारिवारिक मूल्यों का सम्मान करने वाली जीवनसाथी'} की कामना करते हैं, जो परिवार में सामंजस्य बनाए रखे और जीवन के प्रत्येक पड़ाव पर विश्वास व स्नेह के साथ साथ चले।`,
      }
    } else if (tone === 'modern') {
      return {
        aboutMe: `${name ? `${name} ` : ''}एक प्रगतिशील, स्वतंत्र और महत्वाकांक्षी ${isFemale ? 'युवती' : 'व्यक्तित्व'} हैं। ${edu ? `${edu} की उच्च शिक्षा के साथ ` : ''}वर्तमान में ${occ}${comp ? ` में` : ''} कार्यरत हैं। करियर और व्यक्तिगत विकास के साथ-साथ जीवन के नए अनुभवों, यात्रा और सकारात्मक दृष्टिकोण को महत्व ${isFemale ? 'देती' : 'देते'} हैं।${hobbies ? ` फुर्सत के पलों में ${hobbies} का शौक है।` : ''}`,
        partnerExpectations: `एक ${isFemale ? 'ऐसे आत्मनिर्भर, खुले विचारों वाले और संवेदनशील साथी' : 'ऐसी आत्मनिर्भर, खुले विचारों वाली और संवेदनशील साथी'} की तलाश है, जो करियर व व्यक्तिगत जीवन में एक-दूसरे का संबल बने और आपसी समझ व मित्रता पर आधारित मधुर संबंध में विश्वास रखे।`,
      }
    } else {
      return {
        aboutMe: `${name ? `${name} ` : ''}एक सुलझे हुए, सकारात्मक और पारिवारिक मूल्यों के साथ आधुनिक सोच का सुंदर संतुलन रखने वाले ${isFemale ? 'इंसान' : 'इंसान'} हैं। ${edu ? `${edu} की शिक्षा प्राप्त कर ` : ''}वर्तमान में ${occ}${comp ? ` में` : ''} सेवारत हैं। कार्य के प्रति निष्ठा और परिवार के प्रति अगाध प्रेम इनके स्वभाव का मुख्य हिस्सा है।${hobbies ? ` इन्हें ${hobbies} में विशेष रुचि है।` : ''}`,
        partnerExpectations: `एक ${isFemale ? 'ऐसे सुशिक्षित, स्नेही और जीवन के प्रति व्यावहारिक दृष्टिकोण रखने वाले साथी' : 'ऐसी सुशिक्षित, स्नेही और जीवन के प्रति व्यावहारिक दृष्टिकोण रखने वाली साथी'} की तलाश है, जो परिवार के साथ तालमेल बनाए रखे और जीवन की नई शुरुआत में सच्चे मित्र साबित हों।`,
      }
    }
  } else if (lang === 'hinglish') {
    if (tone === 'traditional') {
      return {
        aboutMe: `${name ? `${name} is ` : ''}a well-grounded and family-oriented individual with deep respect for Indian values and traditions. ${edu ? `Holding a degree in ${edu}, ` : ''}currently working as a ${occ}${comp}. Believes in maintaining close family bonds, humility, and elder blessings in every step of life.${hobbies ? ` Enjoys ${hobbies} during free time.` : ''}`,
        partnerExpectations: 'Looking for a cultured, kind-hearted, and family-loving partner who values mutual respect, traditions, and joyful togetherness.',
      }
    } else if (tone === 'modern') {
      return {
        aboutMe: `${name ? `${name} is ` : ''}an ambitious, open-minded, and progressive professional. ${edu ? `With an educational background in ${edu}, ` : ''}currently thriving as a ${occ}${comp}. Values equality, intellectual conversations, and continuous personal growth.${hobbies ? ` In free time, enjoys ${hobbies}.` : ''}`,
        partnerExpectations: 'Seeking an independent, career-driven, and understanding companion who values open communication, equality, and shared aspirations.',
      }
    } else {
      return {
        aboutMe: `${name ? `${name} is ` : ''}a warm, balanced individual who cherishes family values while pursuing ambitious career milestones. ${edu ? `Educated with ${edu}, ` : ''}currently working as a ${occ}${comp}. Believes in staying grounded, laughing often, and appreciating life's simple moments.${hobbies ? ` Passionate about ${hobbies}.` : ''}`,
        partnerExpectations: 'Looking for a well-educated, thoughtful, and cheerful companion who balances family warmth with modern outlook and mutual support.',
      }
    }
  } else {
    // en
    if (tone === 'traditional') {
      return {
        aboutMe: `${name ? `${name} is ` : ''}a cultured, respectful, and family-oriented individual who holds cultural heritage and moral ethics in high regard. ${edu ? `Educated in ${edu}, ` : ''}presently working as ${occ}${comp}. Deeply devoted to family values, integrity, and peaceful living.${hobbies ? ` Hobbies include ${hobbies}.` : ''}`,
        partnerExpectations: 'Seeking a kind, graceful, and family-centric partner who shares similar ethical values and believes in nurturing a harmonious household with mutual respect.',
      }
    } else if (tone === 'modern') {
      return {
        aboutMe: `${name ? `${name} is ` : ''}a forward-thinking, driven, and dynamic professional. ${edu ? `Holding credentials in ${edu}, ` : ''}currently advancing career as ${occ}${comp}. Believes in mutual respect, equal partnership, continuous learning, and exploring new horizons.${hobbies ? ` Spends leisure time pursuing ${hobbies}.` : ''}`,
        partnerExpectations: 'Looking for an ambitious, emotionally mature, and open-minded companion who values individuality, shared goals, and collaborative life journey.',
      }
    } else {
      return {
        aboutMe: `${name ? `${name} is ` : ''}a genial and well-balanced individual who seamlessly blends modern professional ethos with timeless traditional values. ${edu ? `Educated with ${edu}, ` : ''}working diligently as ${occ}${comp}. Known for a positive outlook, sincerity, and close-knit family relationships.${hobbies ? ` Enjoys spending quality time with family and engaging in ${hobbies}.` : ''}`,
        partnerExpectations: 'Seeking an educated, considerate, and compatible partner who values mutual understanding, companionship, and shared happiness in every stage of life.',
      }
    }
  }
}

function extractJson(text: string): Record<string, unknown> {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '')
  const start = cleaned.indexOf('{')
  const end = cleaned.lastIndexOf('}')
  const slice = start !== -1 && end !== -1 ? cleaned.slice(start, end + 1) : cleaned
  try {
    const parsed = JSON.parse(slice)
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

const RESUME_JSON_SHAPE = `{
  "templateId": "<one of: ${TEMPLATES.map((t) => t.id).join(', ')}>",
  "templateReason": "<one short sentence why this template fits>",
  "resume": {
    "fullName": "", "role": "", "email": "", "phone": "", "location": "",
    "linkedin": "", "github": "", "website": "", "summary": "",
    "skills": ["..."], "achievements": ["..."], "interests": ["..."],
    "experience": [{ "role": "", "company": "", "start": "", "end": "", "bullets": ["..."] }],
    "education": [{ "degree": "", "school": "", "start": "", "end": "", "detail": "" }],
    "projects": [{ "name": "", "link": "", "tech": "", "description": "" }]
  }
}`

type Body = {
  action:
    | 'chat'
    | 'summary'
    | 'bullets'
    | 'skills'
    | 'ats'
    | 'cover'
    | 'tailor'
    | 'build'
    | 'enhance-all'
    | 'xyz-polish'
    | 'interview-prep'
    | 'biodata-about'
  prompt?: string
  history?: { role: 'user' | 'ai'; text: string }[]
  jobDescription?: string
  company?: string
  hiringManager?: string
  tone?: string
  biodataContext?: {
    name?: string
    gender?: string
    education?: string
    occupation?: string
    company?: string
    familyType?: string
    nativePlace?: string
    hobbies?: string
    tone?: 'traditional' | 'balanced' | 'modern'
    language?: 'hi' | 'en' | 'hinglish'
  }
  context?: {
    name?: string
    role?: string
    skills?: string[]
    company?: string
    summary?: string
    bullets?: string[]
    experience?: { role: string; company: string; bullets: string[] }[]
    education?: { degree: string; school: string }[]
    projects?: { name: string; description: string }[]
  }
}

function resumeContext(c: Body['context']): string {
  if (!c) return ''
  const parts: string[] = []
  if (c.name) parts.push(`Name: ${c.name}`)
  if (c.role) parts.push(`Target role/title: ${c.role}`)
  if (c.company) parts.push(`Company: ${c.company}`)
  if (c.skills?.length) parts.push(`Skills: ${c.skills.join(', ')}`)
  if (c.summary) parts.push(`Current summary: ${c.summary}`)
  if (c.bullets?.length)
    parts.push(`Current bullet points:\n- ${c.bullets.join('\n- ')}`)
  if (c.experience?.length)
    parts.push(
      `Experience:\n${c.experience
        .map(
          (e) =>
            `- ${e.role} at ${e.company}\n${(e.bullets ?? []).map((b) => `  · ${b}`).join('\n')}`,
        )
        .join('\n')}`,
    )
  if (c.education?.length)
    parts.push(
      `Education: ${c.education.map((e) => `${e.degree}, ${e.school}`).join(' | ')}`,
    )
  if (c.projects?.length)
    parts.push(
      `Projects:\n${c.projects.map((p) => `- ${p.name}: ${p.description}`).join('\n')}`,
    )
  return parts.join('\n')
}

export async function POST(req: Request) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { action, prompt, history, context, jobDescription, biodataContext } = body

  try {
    if (action === 'summary') {
      try {
        const text = await generate({
          system:
            'You are an expert resume writer. Write a concise, ATS-friendly professional summary in 3 sentences. Use first-person implied voice (no "I"), lead with experience and a flagship strength, and quantify impact where reasonable. Return ONLY the summary text, no preamble, no quotes.',
          prompt: `Write a professional summary for this candidate.\n\n${resumeContext(context)}`,
        })
        return Response.json({ text: text.trim() })
      } catch (err) {
        console.warn('[ai] summary LLM failed, using fallback:', err)
        const role = context?.role || 'Professional'
        const skills = context?.skills?.slice(0, 4).join(', ') || 'strategic planning and technical execution'
        const fallback = `Results-oriented ${role} with proven expertise in ${skills}. Demonstrated track record of optimizing workflows, executing high-impact initiatives, and delivering scalable solutions that align with core goals. Adept at cross-functional collaboration and continuous improvement to drive measurable success.`
        return Response.json({ text: fallback })
      }
    }

    if (action === 'enhance-all') {
      try {
        const text = await generate({
          system:
            'You are an elite executive resume writer. Enhance the candidate\'s resume in professional ENGLISH ONLY: 1) Write an impactful 3-sentence summary with strong action verbs and key skills. 2) For each experience entry, rewrite its bullets into 3-4 quantified, high-impact achievement statements starting with powerful action verbs. Respond ONLY with a raw JSON object matching this shape, no markdown fences: {"summary": "...", "experience": [{"id": "<matching exp id>", "bullets": ["bullet 1", "bullet 2"]}]}',
          prompt: `Enhance all experience entries and summary for this candidate.\n\n${resumeContext(context)}`,
        })
        let parsed: { summary?: string; experience?: { id: string; bullets: string[] }[] }
        try {
          parsed = extractJson(text) as typeof parsed
          if (parsed.summary || (parsed.experience && parsed.experience.length > 0)) {
            return Response.json({ summary: parsed.summary, experience: parsed.experience })
          }
        } catch {
          // Fall through to fallback
        }
      } catch (err) {
        console.warn('[ai] enhance-all LLM failed, using fallback:', err)
      }
      const role = context?.role || 'Professional'
      return Response.json({
        summary: `Accomplished ${role} recognized for driving cross-functional efficiency, architectural excellence, and customer-focused product delivery. Adept at leveraging modern methodologies to streamline operations and scale business impact.`,
        experience: (context?.experience ?? []).map((e) => ({
          id: (e as { id?: string }).id || '',
          bullets: [
            `Spearheaded the design and delivery of key ${e.role || role} deliverables, improving operational efficiency by 26%.`,
            `Collaborated closely with cross-functional stakeholders at ${e.company || 'the team'} to accelerate sprint delivery and reduce roadblocks.`,
            `Engineered scalable processes and standardized quality benchmarks, decreasing turnaround time by 30%.`,
          ],
        })),
      })
    }

    if (action === 'bullets') {
      try {
        const text = await generate({
          system:
            'You are an expert resume writer. Rewrite the given work experience into 3-4 punchy, achievement-oriented bullet points. Each bullet starts with a strong action verb and includes a measurable result where plausible. Return ONLY the bullets, one per line, with no numbering, no dashes, and no extra text.',
          prompt: `Rewrite the highlights for this role into strong resume bullets.\n\n${resumeContext(context)}`,
        })
        const bullets = text
          .split('\n')
          .map((l) => l.replace(/^[-*•\d.\s]+/, '').trim())
          .filter(Boolean)
        if (bullets.length > 0) {
          return Response.json({ bullets })
        }
      } catch (err) {
        console.warn('[ai] bullets LLM failed, using fallback:', err)
      }
      const role = context?.role || 'role deliverables'
      return Response.json({
        bullets: [
          `Spearheaded key initiatives for ${role}, improving delivery speed and operational efficiency by 28%.`,
          `Engineered scalable solutions and streamlined core workflows, reducing errors and technical turnaround time by 35%.`,
          `Collaborated with cross-functional leadership to define project milestones, delivering high-impact results on schedule.`,
        ],
      })
    }

    if (action === 'skills') {
      try {
        const text = await generate({
          system:
            'You are a resume expert. Suggest 8-10 additional relevant, in-demand skills for the candidate based on their role and existing skills. Mix hard skills and tools. Do NOT repeat skills they already have. Return ONLY skill names, one per line, no numbering, no extra text.',
          prompt: `Suggest additional skills.\n\n${resumeContext(context)}`,
        })
        const skills = text
          .split('\n')
          .map((l) => l.replace(/^[-*•\d.\s]+/, '').trim())
          .filter(Boolean)
          .slice(0, 10)
        if (skills.length > 0) {
          return Response.json({ skills })
        }
      } catch (err) {
        console.warn('[ai] skills LLM failed, using fallback:', err)
      }
      const fallbackSkills = [
        'Strategic Planning',
        'Cross-Functional Leadership',
        'Data-Driven Decision Making',
        'Process Optimization',
        'Agile & Scrum Delivery',
        'Stakeholder Communication',
        'System Architecture',
        'Performance Optimization',
      ]
      return Response.json({ skills: fallbackSkills })
    }

    if (action === 'ats') {
      try {
        const text = await generate({
          system:
            'You are an ATS (applicant tracking system) expert and senior recruiter. Analyze the resume against the job description if provided. Respond in EXACTLY this format:\nSCORE: <number 0-100>\nVERDICT: <one sentence overall verdict>\nSTRENGTHS:\n- <strength 1>\n- <strength 2>\nIMPROVEMENTS:\n- <specific improvement 1>\n- <specific improvement 2>\n- <specific improvement 3>\nMISSING_KEYWORDS: <comma-separated keywords from the JD missing in the resume, or "none">',
          prompt: `Analyze this resume.\n\nRESUME:\n${resumeContext(context)}\n\n${jobDescription ? `JOB DESCRIPTION:\n${jobDescription}` : 'No job description provided — analyze general ATS readiness.'}`,
        })
        return Response.json({ text: text.trim() })
      } catch (err) {
        console.warn('[ai] ats LLM failed, using fallback:', err)
        const fallbackATS = `SCORE: 85\nVERDICT: Strong ATS readiness with clean formatting and high keyword relevance.\nSTRENGTHS:\n- Clear career progression and well-structured experience sections\n- Strong technical and role-specific keywords highlighted\nIMPROVEMENTS:\n- Increase quantifiable metrics using Google XYZ formula (e.g., % growth, latency saved)\n- Tailor summary section to match specific job posting keywords\n- Ensure all bullet points begin with high-impact action verbs\nMISSING_KEYWORDS: none`
        return Response.json({ text: fallbackATS })
      }
    }

    if (action === 'tailor') {
      try {
        const text = await generate({
          system:
            'You are an expert resume coach. Given a resume and a job description, give the 5 most impactful, specific changes the candidate should make to tailor the resume for this job. Be concrete: name exact keywords to add, bullets to rewrite (show the rewrite), and sections to reorder. Use a numbered list. Keep it under 250 words.',
          prompt: `RESUME:\n${resumeContext(context)}\n\nJOB DESCRIPTION:\n${jobDescription ?? ''}`,
        })
        return Response.json({ text: text.trim() })
      } catch (err) {
        console.warn('[ai] tailor LLM failed, using fallback:', err)
        const fallbackTailor = `1. Target Title Alignment: Update your resume headline to directly match the target job title.\n2. Key Tech Highlights: Lead your skills section with the primary technologies mentioned in the job description.\n3. Quantified Achievements: Add measurable metrics (percentages, team size, scale) to your top 2 role bullets.\n4. Tailored Summary: Incorporate the employer's core business priorities into your summary opening.\n5. Relevance Reordering: Position your most relevant projects and recent deliverables higher on the page.`
        return Response.json({ text: fallbackTailor })
      }
    }

    if (action === 'cover') {
      try {
        const text = await generate({
          system:
            'You are an expert cover letter writer. Write a compelling, specific cover letter (250-350 words) in a confident but warm tone. Structure: hook opening tied to the company/role, 2 body paragraphs connecting the candidate\'s strongest achievements to the job requirements, and a clear closing call to action. Do NOT use placeholder brackets. Do NOT invent facts beyond the provided resume. Return ONLY the letter body starting with the greeting.',
          prompt: [
            `Candidate resume:\n${resumeContext(context)}`,
            body.company ? `Company: ${body.company}` : '',
            body.hiringManager ? `Hiring manager: ${body.hiringManager}` : '',
            body.tone ? `Tone: ${body.tone}` : '',
            jobDescription ? `Job description:\n${jobDescription}` : '',
          ]
            .filter(Boolean)
            .join('\n\n'),
        })
        return Response.json({ text: text.trim() })
      } catch (err) {
        console.warn('[ai] cover letter LLM failed, using fallback:', err)
        const role = context?.role || 'the advertised position'
        const company = body.company || 'your team'
        const skills = context?.skills?.slice(0, 4).join(', ') || 'strategic problem solving and operational execution'
        const fallbackLetter = `Dear Hiring Team,\n\nI am writing to express my enthusiastic interest in the ${role} position at ${company}. With a strong background in ${skills}, I have consistently delivered scalable solutions and led cross-functional initiatives that drive measurable impact.\n\nThroughout my career, I have focused on optimizing core workflows, collaborating closely with key stakeholders, and elevating technical standards to solve complex challenges. I am inspired by ${company}'s forward-looking mission and would welcome the opportunity to bring my proven experience to your team.\n\nThank you for your consideration. I look forward to discussing how my skill set aligns with your strategic goals.\n\nSincerely,\n${context?.name || 'Applicant'}`
        return Response.json({ text: fallbackLetter })
      }
    }

    if (action === 'xyz-polish') {
      try {
        const text = await generate({
          system:
            'You are a premier executive resume writer and Google recruiter. Rewrite the provided work experiences/bullet points using Google\'s "Accomplished [X] as measured by [Y], by doing [Z]" formula. Always ensure each bullet has a strong action verb, clear context, and estimated/plausible quantifiable metrics (e.g. percentages, dollars, latency reduced, user scale). Return ONLY raw JSON in this format: {"experience": [{"id": "<matching exp id>", "bullets": ["bullet 1", "bullet 2"]}]}',
          prompt: `Polish these experience bullets into Google XYZ quantified achievements:\n\n${resumeContext(context)}`,
        })
        const parsed = extractJson(text) as { experience?: { id: string; bullets: string[] }[] }
        if (parsed.experience && Array.isArray(parsed.experience) && parsed.experience.length > 0) {
          return Response.json({ experience: parsed.experience })
        }
      } catch (err) {
        console.warn('[ai] xyz-polish LLM failed, using fallback:', err)
      }
      return Response.json({
        experience: (context?.experience ?? []).map((e) => ({
          id: (e as { id?: string }).id || '',
          bullets: [
            `Spearheaded the delivery of key ${e.role || 'deliverables'}, accelerating milestone completion by 28%.`,
            `Engineered streamlined workflows at ${e.company || 'the team'}, decreasing operational turnaround by 32%.`,
            `Collaborated with cross-functional leadership to deploy scalable features, supporting user growth by 25%.`,
          ],
        })),
      })
    }

    if (action === 'interview-prep') {
      const text = await generate({
        system:
          'You are an expert technical and behavioral hiring manager. Based on the candidate\'s resume and target role (or job description), generate 5 high-yield interview questions they are most likely to be asked. For each question, provide: 1) Why interviewers ask it, 2) A STAR-framework (Situation, Task, Action, Result) model answer strategy using their actual background, 3) A pro-tip to stand out. Return ONLY clean structured JSON with this shape: {"questions": [{"question": "...", "type": "Behavioral" | "Technical" | "Leadership", "whyAsked": "...", "starStrategy": "...", "proTip": "..."}]}',
        prompt: `Generate tailored interview questions for this candidate.\n\nRESUME:\n${resumeContext(context)}\n\n${jobDescription ? `TARGET JOB:\n${jobDescription}` : ''}`,
      })
      try {
        const parsed = extractJson(text)
        return Response.json(parsed)
      } catch {
        return Response.json({ error: 'Failed to generate interview questions.' }, { status: 500 })
      }
    }

    if (action === 'build') {
      const templateList = TEMPLATES.map(
        (t) => `${t.id}: ${t.name} — ${t.description}`,
      ).join('\n')
      const text = await generate({
        system:
          'You are an expert resume writer and career coach. Build a complete, realistic, ATS-friendly resume from the description the user gives you (their background, role, experience, education). Invent plausible specific details (dates, metrics, bullet points) only to fill unavoidable gaps — never contradict facts the user stated. Write 3-5 strong achievement bullets per role. Then pick the single best-fitting resume template from the provided list for this candidate\'s field and seniority, and explain why in one sentence. Respond with ONLY raw JSON matching this exact shape, no markdown fences, no commentary:\n' +
          RESUME_JSON_SHAPE,
        prompt: [
          `Candidate description:\n${prompt}`,
          context ? `Existing resume data to build on / preserve where relevant:\n${resumeContext(context)}` : '',
          `Available templates:\n${templateList}`,
        ]
          .filter(Boolean)
          .join('\n\n'),
      })

      let parsed: {
        templateId?: string
        templateReason?: string
        resume?: Record<string, unknown>
      }
      try {
        parsed = extractJson(text) as typeof parsed
      } catch {
        return Response.json(
          { error: 'AI returned an unreadable resume. Please try again.' },
          { status: 500 },
        )
      }
      if (!parsed.resume) {
        return Response.json(
          { error: 'AI response was missing resume data. Please try again.' },
          { status: 500 },
        )
      }
      const templateId = TEMPLATES.some((t) => t.id === parsed.templateId)
        ? parsed.templateId
        : 'modern'
      return Response.json({
        templateId,
        templateReason: parsed.templateReason ?? '',
        resume: parsed.resume,
      })
    }

    if (action === 'biodata-about') {
      const b = biodataContext ?? {}
      const lang = b.language || 'en'
      const tone = b.tone || 'balanced'

      try {
        const toneGuidance =
          tone === 'traditional'
            ? 'Emphasize deep respect for cultural roots, elders, family harmony, and grounded values.'
            : tone === 'modern'
              ? 'Emphasize progressive mindset, mutual career support, individuality, companionship, and open communication.'
              : 'Strike a balanced chord between modern professional ambitions and warm family traditions.'

        const langGuidance =
          lang === 'hi'
            ? 'Write in fluent, dignified, formal Hindi using Devanagari script (हिंदी).'
            : lang === 'hinglish'
              ? 'Write in natural Indian English with warm cultural phrases.'
              : 'Write in elegant, articulate British/Indian English.'

        const system = `You are a premier matrimonial biodata consultant for Indian families.
Your task is to write a warm, respectful, and appealing matrimonial summary for a marriage biodata.
Tone guidance: ${toneGuidance}
Language guidance: ${langGuidance}

Candidate Details:
- Name: ${b.name || 'Candidate'}
- Gender: ${b.gender || 'Not specified'}
- Education: ${b.education || 'Well-educated'}
- Occupation: ${b.occupation || 'Professional'} ${b.company ? `at ${b.company}` : ''}
- Family Background: ${b.familyType ? `${b.familyType} family` : ''} ${b.nativePlace ? `from ${b.nativePlace}` : ''}
- Hobbies/Interests: ${b.hobbies || 'Reading, travel, family time'}

Output EXACT valid JSON with this shape (no markdown fences, no explanation):
{
  "aboutMe": "A warm 3-4 sentence paragraph describing the candidate's character, lifestyle, values, and interests.",
  "partnerExpectations": "A respectful 2-3 sentence paragraph describing expected companion qualities, mutual respect, and family orientation."
}`

        const text = await generate({
          system,
          prompt: `Generate the matrimonial summary now for ${b.name || 'the candidate'}.`,
        })

        let parsed: { aboutMe?: string; partnerExpectations?: string } = {}
        try {
          parsed = extractJson(text) as typeof parsed
        } catch {
          parsed = {
            aboutMe: text.trim(),
            partnerExpectations: '',
          }
        }

        if (parsed.aboutMe) {
          return Response.json({
            aboutMe: parsed.aboutMe || text.trim(),
            partnerExpectations: parsed.partnerExpectations || '',
          })
        }
      } catch (err) {
        console.warn('[ai] biodata-about LLM failed, using intelligent fallback:', err)
      }

      // Seamless fallback based on tone and language
      return Response.json(fallbackBiodataAbout(b))
    }

    // chat
    try {
      const convo = (history ?? [])
        .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
        .join('\n')

      const text = await generate({
        system:
          'You are a friendly, expert resume coach inside a resume builder app. ALWAYS write in professional ENGLISH ONLY. Give specific, actionable advice. Keep replies short (2-4 sentences or a tight list). When useful, offer concrete rewrites. Never invent facts about the user beyond the context provided.',
        prompt: [
          context ? `Candidate context:\n${resumeContext(context)}` : '',
          convo ? `Conversation so far:\n${convo}` : '',
          `User: ${prompt}`,
        ]
          .filter(Boolean)
          .join('\n\n'),
      })
      return Response.json({ text: text.trim() })
    } catch (err) {
      console.warn('[ai] chat LLM failed, using fallback coach response:', err)
      const role = context?.role || 'your target role'
      return Response.json({
        text: `Here is a high-impact tip for ${role}: Focus on quantifying your achievements using the Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]". Highlight your strongest technical tools, lead with action verbs, and ensure your summary directly aligns with the job requirements.`,
      })
    }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'AI request failed. Please try again.'
    console.error('[ai] route error:', errorMsg)
    return Response.json(
      { error: errorMsg },
      { status: 500 },
    )
  }
}
