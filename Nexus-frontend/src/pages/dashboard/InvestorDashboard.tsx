import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  PieChart,
  Filter,
  Search,
  PlusCircle,
  MessageCircle,
  Video,
} from "lucide-react";

import { Button } from "../../components/ui/Button";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { EntrepreneurCard } from "../../components/entrepreneur/EntrepreneurCard";
import { entrepreneurs } from "../../data/users";

export const InvestorDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

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

  // 🔍 FILTER LOGIC
  const filteredEntrepreneurs = entrepreneurs.filter((e) => {
    const matchesSearch =
      searchQuery === "" ||
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.industry.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry =
      selectedIndustries.length === 0 ||
      selectedIndustries.includes(e.industry);

    return matchesSearch && matchesIndustry;
  });

  const industries = Array.from(new Set(entrepreneurs.map((e) => e.industry)));

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome, {user.name} 👋
          </h1>
          <p className="text-gray-600">
            Discover and invest in startups
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

          <Link to="/entrepreneurs">
            <Button leftIcon={<PlusCircle size={18} />}>
              View Startups
            </Button>
          </Link>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search startups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            startAdornment={<Search size={18} />}
          />
        </div>

        <div className="w-full md:w-1/3 flex flex-wrap gap-2 items-center">
          <Filter size={18} />
          {industries.map((industry) => (
           <div
  key={industry}
  onClick={() => toggleIndustry(industry)}
  className="cursor-pointer"
>
  <Badge
    variant={selectedIndustries.includes(industry) ? "primary" : "gray"}
  >
    {industry}
  </Badge>
</div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center">
              <Users className="mr-3" />
              <div>
                <p>Total Startups</p>
                <h3 className="text-xl font-bold">
                  {entrepreneurs.length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <PieChart className="mr-3" />
              <div>
                <p>Industries</p>
                <h3 className="text-xl font-bold">
                  {industries.length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <Users className="mr-3" />
              <div>
                <p>Your Connections</p>
                <h3 className="text-xl font-bold">0</h3>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* STARTUPS */}
      <Card>
        <CardHeader>
          <h2>Featured Startups</h2>
        </CardHeader>

        <CardBody>
          {filteredEntrepreneurs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEntrepreneurs.map((e) => (
                <EntrepreneurCard key={e.id} entrepreneur={e} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p>No results found</p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedIndustries([]);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

    </div>
  );
};