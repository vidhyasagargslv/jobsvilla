import { Briefcase, MapPin, DollarSign, GraduationCap, Clock, Phone, Users } from "lucide-react"
export default function JobList({ jobs }) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-card border border-gray-50 p-6 rounded-lg shadow-lg h-[32rem] flex flex-col"
          >
            {/* Job Title */}
            <h2 className="text-2xl font-bold text-foreground line-clamp-2 min-h-[4rem]">

              {job.title}
            </h2>

            {/* Company and Location */}
            <p className="text-muted-foreground flex flex-col ">
              <span className="company inline-flex items-center line-clamp-1">
                <Briefcase className="inline-block" size={24} />
                 {job.company}
              </span>
              <span className="location inline-flex items-center mt-1 line-clamp-1">
                <MapPin className="inline-block" size={24} />
                 {job.location}
              </span>
            </p>

            {/* Job Category and Employment Type */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm text-white">
                {job.job_category}
              </span>
              <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                {job.employment_type}
              </span>
            </div>

            {/* Salary Range */}
            <p className="mt-4 text-lg font-semibold text-foreground">
              <span><DollarSign className="inline-block" size={20} /></span>
              {job.salary_from.toLocaleString()} - {job.salary_to.toLocaleString()} per year
            </p>

            {/* Qualifications */}
            <div className="mt-4 flex-grow overflow-hidden">
              <h3 className="font-semibold text-blue-500">
              <GraduationCap className="inline-block" size={24} />
                Qualifications
              </h3>
              <ul className="list-disc list-inside text-muted-foreground mt-2">
                {JSON.parse(job.qualifications).slice(0, 3).map((qualification, index) => (
                  <li key={index} className="line-clamp-1">
                    
                    {qualification}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <p className="mt-4 text-muted">
              <span className="inline-flex items-center text-black line-clamp-1">
                <Phone className="inline-block" size={24} />
                 Contact: {job.contact}
              </span>
            </p>

            {/* Number of Openings */}
            <div className="mt-4">
              <span className="text-muted text-black">
                <Users className="inline-block" size={24} />
                {job.number_of_opening} opening(s)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}