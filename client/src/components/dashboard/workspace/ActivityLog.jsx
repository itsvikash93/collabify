import React from "react";

const ActivityLog = () => {
  const activities = [
    {
      id: 1,
      message: "Task 'Design Mockups' moved to Done",
      time: "2 mins ago",
    },
    {
      id: 2,
      message: "New task 'API Development' added to To-Do",
      time: "10 mins ago",
    },
    { id: 3, message: "User 'Alice' joined the project", time: "1 hour ago" },
  ];

  return (
    <div className="h-full w-full rounded-md p-4 shadow-xl">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id} className="mb-2">
            <p>{activity.message}</p>
            <span className="text-gray-500 text-sm">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
