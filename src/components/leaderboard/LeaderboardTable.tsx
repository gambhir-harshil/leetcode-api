import TableComp from "../TableComp";

const DATA = [
  {
    rank: 2,
    username: "string",
    level: "string",
    league: "string",
    acceptance: 50,
    dailyActivity: [5, 4, 2, 5, 1, 3, 4, 5],
  },
  {
    rank: 1,
    username: "string",
    level: "string",
    league: "string",
    acceptance: 50,
    dailyActivity: [5, 4, 2, 5, 1, 3, 4, 5],
  },
  {
    rank: 3,
    username: "string",
    level: "string",
    league: "string",
    acceptance: 50,
    dailyActivity: [5, 4, 2, 5, 1, 3, 4, 5],
  },
];

export default function LeaderboardTable() {
  return <TableComp data={DATA} />;
}
