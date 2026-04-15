import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Bell,
  Calendar,
  TrendingUp,
  AlertCircle,
  PlusCircle,
  MessageCircle,
  Video,
} from "lucide-react";

import { Button } from "../../components/ui/Button";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { CollaborationRequestCard } from "../../components/collaboration/CollaborationRequestCard";
import { InvestorCard } from "../../components/investor/InvestorCard";

import { CollaborationRequest } from "../../types";
import { investors } from "../../data/users";

export const EntrepreneurDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([]);
  const [recommendedInvestors] = useState(investors.slice(0, 3));

  // ✅ FETCH USER FROM BACKEND
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    fetch("http://localhost:5000/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  // ✅ HANDLE REQUEST UPDATE
  const handleRequestStatusUpdate = (
    requestId: string,
    status: "accepted" | "rejected"
  ) => {
    setCollaborationRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status } : req
      )
    );
  };

  const pendingRequests = collaborationRequests.filter(
    (req) => req.status === "pending"
  );

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {user.name} 👋
          </h1>
          <p className="text-gray-600">
            Manage your startup & connect with investors
          </p>
        </div>

        <div className="flex gap-2">
          <Link to="/chat">
            <Button leftIcon={<MessageCircle size={18} />}>
              Chat
            </Button>
          </Link>

          <Link to="/connections">
            <Button leftIcon={<Video size={18} />}>
              Video Call
            </Button>
          </Link>

          <Link to="/investors">
            <Button leftIcon={<PlusCircle size={18} />}>
              Find Investors
            </Button>
          </Link>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center">
              <Bell className="mr-3" />
              <div>
                <p>Pending Requests</p>
                <h3 className="text-xl font-bold">{pendingRequests.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <Users className="mr-3" />
              <div>
                <p>Connections</p>
                <h3 className="text-xl font-bold">
                  {collaborationRequests.filter((r) => r.status === "accepted").length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <Calendar className="mr-3" />
              <div>
                <p>Meetings</p>
                <h3 className="text-xl font-bold">2</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <TrendingUp className="mr-3" />
              <div>
                <p>Growth</p>
                <h3 className="text-xl font-bold">+24%</h3>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* REQUESTS */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex justify-between">
              <h2>Collaboration Requests</h2>
              <Badge>{pendingRequests.length}</Badge>
            </CardHeader>

            <CardBody>
              {collaborationRequests.length > 0 ? (
                collaborationRequests.map((req) => (
                  <CollaborationRequestCard
                    key={req.id}
                    request={req}
                    onStatusUpdate={handleRequestStatusUpdate}
                  />
                ))
              ) : (
                <div className="text-center py-10">
                  <AlertCircle className="mx-auto mb-2" />
                  <p>No requests yet</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* INVESTORS */}
        <div>
          <Card>
            <CardHeader>
              <h2>Recommended Investors</h2>
            </CardHeader>

            <CardBody>
              {recommendedInvestors.map((inv) => (
                <InvestorCard key={inv.id} investor={inv} />
              ))}
            </CardBody>
          </Card>
        </div>

      </div>
    </div>
  );
};