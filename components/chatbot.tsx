"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type ChatMessage = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

const starterSuggestions = [
  "What services does S-HATCH provide?",
  "Tell me about your AI technology stack.",
  "How can I contact you?",
  "Do you offer custom AI development?",
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [input, setInput] = React.useState<string>("")
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Hi! I’m your AI assistant. Ask me about our services, technology, or how to get in touch.",
    },
  ])
  const [isSending, setIsSending] = React.useState<boolean>(false)
  const listRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (isOpen && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, isOpen])

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim()
    if (!content || isSending) return
    setInput("")

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content }
    setMessages((prev) => [...prev, userMsg])
    setIsSending(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
        }),
      })
      const data = (await res.json()) as { reply?: string; error?: string }
      const reply = data.reply ?? data.error ?? "Sorry, I couldn’t generate a response right now."
      const botMsg: ChatMessage = { id: crypto.randomUUID(), role: "assistant", content: reply }
      setMessages((prev) => [...prev, botMsg])
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: "Network error. Please try again." },
      ])
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        aria-label="Open chat"
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 rounded-full p-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg hover:from-cyan-500 hover:to-purple-500 focus:outline-none"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-20 right-5 z-50 w-[90vw] max-w-sm rounded-2xl border border-cyan-500/20 bg-gray-900/95 backdrop-blur-md shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <div className="rounded-md p-1.5 bg-gradient-to-r from-cyan-600/30 to-purple-600/30">
                  <Bot className="h-4 w-4 text-cyan-300" />
                </div>
                <div className="text-sm">
                  <div className="text-white font-medium">S-HATCH Assistant</div>
                  <div className="text-gray-400 text-xs">Ask anything about our AI services</div>
                </div>
              </div>
              <button
                aria-label="Close chat"
                className="text-gray-400 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="max-h-80 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((m) => (
                <div key={m.id} className="flex">
                  <div
                    className={
                      m.role === "user"
                        ? "ml-auto rounded-xl bg-cyan-600/20 border border-cyan-500/30 px-3 py-2 text-sm text-cyan-100"
                        : "mr-auto rounded-xl bg-gray-800/70 border border-purple-500/20 px-3 py-2 text-sm text-gray-100"
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {/* Suggestions when short history */}
              {messages.length <= 2 && (
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {starterSuggestions.map((s) => (
                    <button
                      key={s}
                      className="rounded-lg border border-cyan-500/20 bg-transparent px-3 py-2 text-left text-xs text-gray-300 hover:bg-cyan-500/10"
                      onClick={() => sendMessage(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-cyan-500/20 p-3">
              <div className="flex items-end gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="min-h-[44px] max-h-24 resize-y bg-gray-800/70 text-white placeholder:text-gray-400 border-gray-700"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      void sendMessage()
                    }
                  }}
                />
                <Button
                  onClick={() => sendMessage()}
                  disabled={isSending || !input.trim()}
                  className="h-[44px] bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500"
                >
                  {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              <div className="mt-2 text-[10px] text-gray-500">
                Answers are AI-generated. Keep it short and specific for best results.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


