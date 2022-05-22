export function guessStartOfContest({ qson, contestInfo }) {
  return (contestInfo && contestInfo.start) || (qson.qsos[0] && qson.qsos[0].start)
}

export function generateContestLogKey({ qson, contestInfo, contestRef }) {
  const start = guessStartOfContest({ qson, contestInfo, contestRef })
  const date = new Date(start).toISOString().substring(0, 10)
  return `${contestRef.call}:${contestInfo?.id}:${date}`
}
