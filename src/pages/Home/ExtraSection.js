import React from "react";
import { ResponsiveContainer, Pie, PieChart, Cell } from "recharts";

const ExtraSection = () => {
  let data01 = [
    {
        value : 4321
    },
    {
        value : 2669
    }
  ]
  const COLORS = ['#543D19', '#873e23'];
  const COLORS2 = ['#873e23','#543D19' ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-10 p-5 text-xl font-bold gap-10">
      <div className="stats stats-vertical shadow-xl">
        <div className="stat">
          <div className="stat-title font-normal text-left text-4xl italic">Buyers</div>
          <div className="stat-value text-8xl text-neutral">4,321</div>
          <div className="stat-desc text-success text-right text-xl font-bold mt-3">
            ↗︎ 400 (22%) from last year
          </div>
        </div>

        <div className="stat">
          <div className="stat-title font-normal text-left text-4xl italic">Sellers</div>
          <div className="stat-value text-8xl text-neutral">2,669</div>
          <div className="stat-desc text-amber-600 text-right text-xl font-bold mt-3">
            ↘︎ 190 (14%) from last year
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart width='100%' height='100%'>
          <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius='50%'
            fill="#e28743"
          >
            {data01.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Pie data={data01} dataKey="value" cx="50%" cy="50%" innerRadius='70%' outerRadius='90%' fill="#873e23" label>
          {data01.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExtraSection;
