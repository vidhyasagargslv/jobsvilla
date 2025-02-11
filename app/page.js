"use client"
import { useEffect, useState } from "react";
import JobList from "@/Components/JobList";
import SearchAndFilter from "@/Components/SearchAndFilter";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [page, setPage] = useState(1);
  const [allCompanies, setAllCompanies] = useState([]);

  // Fetch jobs function (as before, possibly with updated query params)
  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      if (searchQuery) {
        params.append("title", searchQuery);
      }
      if (selectedCompany) {
        params.append("company", selectedCompany);
      }
      const response = await fetch(`https://jsonfakery.com/jobs/paginated?${params.toString()}`);
      const data = await response.json();
      setJobs(data.data);
      setPagination(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Fetch the full list of companies on initial load (or from another endpoint)
  const fetchAllCompanies = async () => {
    try {
      const response = await fetch(`https://jsonfakery.com/jobs`); // adjust endpoint as needed
      const data = await response.json();
      const uniqueCompanies = [...new Set(data.map(job => job.company))];
      setAllCompanies(uniqueCompanies);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, searchQuery, selectedCompany]);

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  const handleSearch = (newSearchQuery, newSelectedCompany) => {
    setSearchQuery(newSearchQuery);
    setSelectedCompany(newSelectedCompany);
    setPage(1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.next_page_url) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      <SearchAndFilter handleSearch={handleSearch} allCompanies={allCompanies} />
      <JobList jobs={jobs} />
      <div className="join flex justify-center items-center">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="join-item btn btn-outline w-36"
        >
          Previous page
        </button>
        <button
          onClick={handleNextPage}
          disabled={!pagination.next_page_url}
          className="join-item btn btn-outline w-36"
        >
          Next
        </button>
      </div>
    </div>
  );
}
