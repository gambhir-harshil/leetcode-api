type ILeaderboardData = {
  rank: number;
  username: string;
  level: string;
  league: string;
  acceptance: number;
  dailyActivity: number[];
};

type TableCompProps = {
  data: ILeaderboardData[];
  tableType: string;
};

export default function TableComp({ data, tableType }: TableCompProps) {
  return (
    <table className="table-auto w-full">
      <thead className="bg-[#EAE8FF]">
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>Level</th>
          <th>League</th>
          <th>Acpt%</th>
          <th>Daily Activity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>runtimemafia</td>
          <td>126</td>
          <td>Diamond</td>
          <td>86%</td>
          <td>__/\</td>
        </tr>
        <tr>
          <td>2</td>
          <td>runtimemafia</td>
          <td>126</td>
          <td>Diamond</td>
          <td>86%</td>
          <td>/\__</td>
        </tr>
      </tbody>
    </table>
  );
}
