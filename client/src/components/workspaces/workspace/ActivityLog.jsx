import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";

const getActionIcon = (message) => {
  if (!message)
    return {
      icon: "ri-information-line",
      bg: "bg-[#d4f1eb]",
      color: "text-[#2bb4a4]",
    };
  const m = message.toLowerCase();
  if (m.includes("created") || m.includes("added"))
    return {
      icon: "ri-add-circle-line",
      bg: "bg-green-100",
      color: "text-green-600",
    };
  if (m.includes("deleted") || m.includes("removed"))
    return {
      icon: "ri-delete-bin-line",
      bg: "bg-red-100",
      color: "text-red-500",
    };
  if (m.includes("updated") || m.includes("edited") || m.includes("changed"))
    return { icon: "ri-edit-line", bg: "bg-blue-100", color: "text-blue-500" };
  if (m.includes("assigned"))
    return {
      icon: "ri-user-add-line",
      bg: "bg-purple-100",
      color: "text-purple-500",
    };
  if (m.includes("status") || m.includes("moved"))
    return {
      icon: "ri-swap-line",
      bg: "bg-orange-100",
      color: "text-orange-500",
    };
  if (m.includes("joined") || m.includes("invited"))
    return {
      icon: "ri-group-line",
      bg: "bg-[#d4f1eb]",
      color: "text-[#2bb4a4]",
    };
  return { icon: "ri-pulse-line", bg: "bg-[#d4f1eb]", color: "text-[#2bb4a4]" };
};

const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  return parts.length > 1
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0][0].toUpperCase();
};

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

const ActivityLog = () => {
  const { workspaceId } = useParams();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          `/workspaces/${workspaceId}/activities`,
        );
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [workspaceId]);

  if (loading) {
    return (
      <div className="h-full bg-[#eef7f6] w-full rounded-md p-6 shadow-xl flex flex-col justify-center items-center gap-3">
        <i className="ri-loader-4-line animate-spin text-3xl text-[#33d1bf]"></i>
        <p className="text-gray-400 text-sm">Loading activity...</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#eef7f6] w-full rounded-md shadow-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#c5e9e4] bg-white flex items-center gap-2">
        <i className="ri-time-line text-[#33d1bf] text-xl"></i>
        <h2 className="text-lg font-bold text-[#191D23]">Activity Log</h2>
        {activities.length > 0 && (
          <span className="ml-auto text-xs font-semibold bg-[#d4f1eb] text-[#2bb4a4] px-2 py-0.5 rounded-full">
            {activities.length} {activities.length === 1 ? "event" : "events"}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {activities.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-[#d4f1eb] flex items-center justify-center">
              <i className="ri-inbox-line text-2xl text-[#33d1bf]"></i>
            </div>
            <p className="text-gray-400 text-sm">
              No activity yet in this workspace.
            </p>
          </div>
        ) : (
          <ol className="relative border-l-2 border-[#c5e9e4] ml-3">
            {activities.map((activity) => {
              const { icon, bg, color } = getActionIcon(activity.message);
              return (
                <li key={activity._id} className="mb-6 ml-6 last:mb-0">
                  {/* Timeline dot with icon */}
                  <span
                    className={`absolute -left-[18px] flex items-center justify-center w-8 h-8 rounded-full ${bg} ring-4 ring-[#eef7f6] shadow-sm`}
                  >
                    <i className={`${icon} ${color} text-sm`}></i>
                  </span>

                  <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-[#ddf0ed] hover:border-[#7dcfb4] transition-colors duration-200">
                    <div className="flex items-start gap-3">
                      {/* User avatar */}
                      <div className="w-8 h-8 rounded-full bg-[#7dcfb4] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                        {getInitials(activity.user?.name)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 leading-snug">
                          <span className="font-semibold text-[#191D23]">
                            {activity.user?.name || "Someone"}
                          </span>{" "}
                          <span className="text-gray-600">
                            {activity.message}
                          </span>
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-400 mt-1">
                          <i className="ri-time-line text-[10px]"></i>
                          {timeAgo(activity.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
