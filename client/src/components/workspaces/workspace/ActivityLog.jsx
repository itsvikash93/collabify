import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";

const ActivityLog = () => {
  const { workspaceId } = useParams();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`/workspaces/${workspaceId}/activities`);
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [workspaceId]);

  const timeAgo = (dateObject) => {
    const seconds = Math.floor((new Date() - new Date(dateObject)) / 1000);
    let interval = seconds / 31536000;
    if (interval >= 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval >= 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval >= 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval >= 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval >= 1) return Math.floor(interval) + " mins ago";
    return "Just now";
  };

  if (loading) {
    return (
      <div className="h-full bg-[#eef7f6] w-full rounded-md p-5 shadow-xl flex justify-center items-center">
        <p className="text-gray-500">Loading activities...</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#eef7f6] w-full rounded-md p-5 shadow-xl overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      {activities.length === 0 ? (
        <p className="text-gray-500">No recent activities found.</p>
      ) : (
        <ul>
          {activities.map((activity) => (
            <li key={activity._id} className="mb-3 border-b border-green-100 pb-2 last:border-0 transition-opacity">
              <p className="text-gray-800">
                <span className="font-semibold text-[#2bb4a4]">{activity.user?.name}</span>{" "}
                {activity.message}
              </p>
              <span className="text-gray-400 text-xs">{timeAgo(activity.createdAt)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityLog;
