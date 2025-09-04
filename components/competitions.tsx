"use client"

import { useEffect, useState } from "react"
import { collection, query, orderBy, getDocs, type Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, Users, ExternalLink, Clock } from "lucide-react"

interface Competition {
  id: string
  title: string
  description: string
  startDate: Timestamp
  endDate: Timestamp
  rulesUrl?: string
  rulesText?: string
  submissionLink?: string
  status: "open" | "closed"
  prizes?: string[]
  participants?: number
}

export function Competitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCompetitions() {
      try {
        const q = query(collection(db, "competitions"), orderBy("startDate", "desc"))
        const snapshot = await getDocs(q)
        const items: Competition[] = []
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as Competition)
        })
        setCompetitions(items)
      } catch (error) {
        console.error("Error fetching competitions:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCompetitions()
  }, [])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  if (competitions.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-4 text-center">
        <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No competitions at the moment</h3>
        <p className="text-muted-foreground">Check back soon for exciting competitions and challenges!</p>
      </div>
    )
  }

  return (
    <section className="max-w-5xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
          <Trophy className="mr-3 h-8 w-8 text-yellow-600" />
          Competitions & Challenges
        </h2>
        <p className="text-muted-foreground">
          Participate in our competitions to showcase your skills and win amazing prizes
        </p>
      </div>

      <div className="space-y-6">
        {competitions.map((competition) => (
          <Card key={competition.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2 flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-yellow-600" />
                    {competition.title}
                  </CardTitle>
                  <CardDescription className="text-base">{competition.description}</CardDescription>
                </div>
                <Badge variant={competition.status === "open" ? "default" : "secondary"} className="ml-4">
                  {competition.status === "open" ? "🟢 Open" : "🔴 Closed"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Start Date</div>
                    <div>{competition.startDate.toDate().toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <div className="font-medium">End Date</div>
                    <div>{competition.endDate.toDate().toLocaleDateString()}</div>
                  </div>
                </div>
                {competition.participants && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Participants</div>
                      <div>{competition.participants}</div>
                    </div>
                  </div>
                )}
              </div>

              {competition.prizes && competition.prizes.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Prizes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {competition.prizes.map((prize, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        🏆 {prize}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {competition.rulesText && (
                <div>
                  <h4 className="font-medium mb-2">Rules:</h4>
                  <p className="text-sm text-muted-foreground">{competition.rulesText}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {competition.rulesUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={competition.rulesUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Rules
                    </a>
                  </Button>
                )}
                {competition.status === "open" && competition.submissionLink && (
                  <Button size="sm" asChild>
                    <a href={competition.submissionLink} target="_blank" rel="noopener noreferrer">
                      Submit Entry
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
