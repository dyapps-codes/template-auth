import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, CheckCircle2, Clock, Database } from 'lucide-react'

export function Dashboard() {
  const metrics = [
    { label: 'Records', value: '0', detail: 'No records yet', icon: Database },
    { label: 'Pending actions', value: '0', detail: 'Nothing pending', icon: Clock },
    { label: 'Completed', value: '0', detail: 'No completed items', icon: CheckCircle2 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon

          return (
            <Card key={metric.label}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardDescription>{metric.label}</CardDescription>
                  <CardTitle className="mt-2 text-3xl">{metric.value}</CardTitle>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-md border bg-muted/40 text-muted-foreground">
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{metric.detail}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity</CardTitle>
          <CardDescription>Recent account and workspace updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 flex-col items-center justify-center gap-3 rounded-lg border border-dashed bg-muted/20 text-sm text-muted-foreground">
            <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-background">
              <Activity className="h-4 w-4" />
            </div>
            <span>No activity yet</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
