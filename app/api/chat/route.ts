import { NextRequest, NextResponse } from "next/server"

// Very small in-memory FAQ tailored to the site content
const FAQ = [
  {
    q: /services|offer|provide/i,
    a: "We provide intelligent automation, data intelligence, AI security, process optimization, custom AI development, and business intelligence. Explore the Services section for details.",
  },
  {
    q: /technology|stack|tech/i,
    a: "Our stack includes modern AI/ML techniques and interactive 3D visualizations. You’ll find highlights like machine learning, neural networks, computer vision, NLP, robotics, and even quantum computing in the Technology section.",
  },
  {
    q: /contact|reach|email|phone/i,
    a: "Use the Contact section’s form to send us a message. You can also reach us via email at contact@neuraspace.ai or phone +1 (555) 123-4567.",
  },
  {
    q: /custom|bespoke|tailor|development/i,
    a: "Yes, we offer custom AI development—covering model design, API integration, deployment, and continuous learning.",
  },
]

function answerFromFaq(text: string): string | undefined {
  for (const { q, a } of FAQ) {
    if (q.test(text)) return a
  }
  return undefined
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      messages?: Array<{ role: string; content: string }>
    }
    const last = body?.messages?.filter((m) => m.role === "user").at(-1)?.content?.trim() || ""

    const fromFaq = answerFromFaq(last)
    const reply =
      fromFaq ??
      "I can help with services, technology, and contact info. Try asking things like: ‘What services do you offer?’ or ‘How can I contact you?’"

    return NextResponse.json({ reply })
  } catch (e) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 })
  }
}


