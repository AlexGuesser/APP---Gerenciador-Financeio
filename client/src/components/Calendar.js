import React, { useEffect, useState } from "react";

const months = [
  {
    id: 1,
    name: "Janeiro/2019",
    yearMonth: "2019-01",
  },
  {
    id: 2,
    name: "Fevereiro/2019",
    yearMonth: "2019-02",
  },
  {
    id: 3,
    name: "Março/2019",
    yearMonth: "2019-03",
  },
  {
    id: 4,
    name: "Abril/2019",
    yearMonth: "2019-04",
  },
  {
    id: 5,
    name: "Maio/2019",
    yearMonth: "2019-05",
  },
  {
    id: 6,
    name: "Junho/2019",
    yearMonth: "2019-06",
  },
  {
    id: 7,
    name: "Julho/2019",
    yearMonth: "2019-07",
  },
  {
    id: 8,
    name: "Agosto/2019",
    yearMonth: "2019-08",
  },
  {
    id: 9,
    name: "Setembro/2019",
    yearMonth: "2019-09",
  },
  {
    id: 10,
    name: "Outubro/2019",
    yearMonth: "2019-10",
  },
  {
    id: 11,
    name: "Novembro/2019",
    yearMonth: "2019-11",
  },
  {
    id: 12,
    name: "Dezembro/2019",
    yearMonth: "2019-12",
  },
  {
    id: 13,
    name: "Janeiro/2020",
    yearMonth: "2020-01",
  },
  {
    id: 14,
    name: "Fevereiro/2020",
    yearMonth: "2020-02",
  },
  {
    id: 15,
    name: "Março/2020",
    yearMonth: "2020-03",
  },
  {
    id: 16,
    name: "Abril/2020",
    yearMonth: "2020-04",
  },
  {
    id: 17,
    name: "Maio/2020",
    yearMonth: "2020-05",
  },
  {
    id: 18,
    name: "Junho/2020",
    yearMonth: "2020-06",
  },
  {
    id: 19,
    name: "Julho/2020",
    yearMonth: "2020-07",
  },
  {
    id: 20,
    name: "Agosto/2020",
    yearMonth: "2020-08",
  },
  {
    id: 21,
    name: "Setembro/2020",
    yearMonth: "2020-09",
  },
  {
    id: 22,
    name: "Outubro/2020",
    yearMonth: "2020-10",
  },
  {
    id: 23,
    name: "Novembro/2020",
    yearMonth: "2020-11",
  },
  {
    id: 24,
    name: "Dezembro/2020",
    yearMonth: "2020-12",
  },
  {
    id: 25,
    name: "Janeiro/2021",
    yearMonth: "2021-01",
  },
  {
    id: 26,
    name: "Fevereiro/2021",
    yearMonth: "2021-02",
  },
  {
    id: 27,
    name: "Março/2021",
    yearMonth: "2021-03",
  },
  {
    id: 28,
    name: "Abril/2021",
    yearMonth: "2021-04",
  },
  {
    id: 29,
    name: "Maio/2021",
    yearMonth: "2021-05",
  },
  {
    id: 30,
    name: "Junho/2021",
    yearMonth: "2021-06",
  },
  {
    id: 31,
    name: "Julho/2021",
    yearMonth: "2021-07",
  },
  {
    id: 32,
    name: "Agosto/2021",
    yearMonth: "2021-08",
  },
  {
    id: 33,
    name: "Setembro/2021",
    yearMonth: "2021-09",
  },
  {
    id: 34,
    name: "Outubro/2021",
    yearMonth: "2021-10",
  },
  {
    id: 35,
    name: "Novembro/2021",
    yearMonth: "2021-11",
  },
  {
    id: 36,
    name: "Dezembro/2021",
    yearMonth: "2021-12",
  },
];

export default function Calendar({ onYearMonthChange }) {
  const [monthId, setMonthId] = useState(months[22].id);
  const [monthName, setMonthName] = useState(months[22].name);

  useEffect(() => {
    const monthObject = months.find((month) => month.id === monthId);
    setMonthName(monthObject.name);
    onYearMonthChange(monthObject.yearMonth);
  }, [monthId]);

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value, 10);
    setMonthId(newMonth);
  };

  const handleClickMonthBefore = () => {
    if (monthId > 1) {
      setMonthId(monthId - 1);
    }
  };

  const handleClickMonthAfter = () => {
    if (monthId < 36) {
      setMonthId(monthId + 1);
    }
  };

  return (
    <div className="container" style={styles.flexRow}>
      <button className="btn" onClick={handleClickMonthBefore}>
        {"<"}
      </button>
      <select
        className="browser-default"
        value={monthId}
        onChange={handleMonthChange}
      >
        {months.map((month) => {
          const { id, name } = month;
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </select>
      <a className="btn" onClick={handleClickMonthAfter}>
        {">"}
      </a>
    </div>
  );
}

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px",
  },
};
