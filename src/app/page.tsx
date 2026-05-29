export const dynamic = "force-dynamic";
export const revalidate = 0;

import Section from "@/components/section";
import type { Profile } from "@/types/profile";
import type { Education } from "@/types/education";
import type { Experience } from "@/types/experience";
import type { Projects } from "@/types/projects";

export default async function Home() {
  // ✅ safe Vercel + local base URL
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const getData = async (endpoint: string) => {
    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(`❌ ${endpoint} FAILED:`, res.status, text.slice(0, 200));
        return [];
      }

      const data = await res.json();

      // optional debug
      console.log(`✅ ${endpoint}:`, data);

      return data;
    } catch (err) {
      console.error(`❌ FETCH ERROR ${endpoint}:`, err);
      return [];
    }
  };

  const [profile, education, experience, projects] = await Promise.all([
    getData("/api/profile"),
    getData("/api/education"),
    getData("/api/experience"),
    getData("/api/projects"),
  ]);

  return (
    <main className="min-h-screen px-8 py-16 space-y-20">
      <section className="text-center">
        <h1 className="text-4xl font-bold">Miguel Lopez</h1>
        <p className="mt-4 text-lg">Software Engineer</p>
      </section>

      <Section<Profile>
        title="Profile"
        data={profile}
        renderItem={(p) => (
          <>
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="mt-2 text-gray-600">{p.bio}</p>
          </>
        )}
      />

      <Section<Education>
        title="Education"
        data={education}
        renderItem={(e) => (
          <>
            <h3 className="text-xl font-bold">{e.degree}</h3>
            <p className="mt-2 text-gray-600">{e.field_of_study}</p>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Duration:</span> {e.start_date} -{" "}
              {e.graduation_date}
            </p>
          </>
        )}
      />

      <Section<Experience>
        title="Experience"
        data={experience}
        renderItem={(e) => (
          <>
            <h3 className="text-xl font-bold">{e.title}</h3>
            <p className="mt-2 text-gray-600">{e.company}</p>
            <p className="mt-2 text-gray-600">{e.location}</p>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Duration:</span> {e.start_date} -{" "}
              {e.end_date}
            </p>
            <p className="mt-2 text-gray-600">{e.description}</p>
          </>
        )}
      />

      <Section<Projects>
        title="Projects"
        data={projects}
        renderItem={(p) => (
          <>
            <h3 className="text-xl font-bold">{p.title}</h3>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Creation Date:</span>{" "}
              {p.created_at}
            </p>
            <p className="mt-2 text-gray-600">{p.description}</p>

            <div className="mt-4 flex gap-4">
              <a href={p.github_url} target="_blank" className="text-blue-500">
                GitHub
              </a>
              <a href={p.live_url} target="_blank" className="text-green-500">
                Live
              </a>
            </div>
          </>
        )}
      />
    </main>
  );
}
