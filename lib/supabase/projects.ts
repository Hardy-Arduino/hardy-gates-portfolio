import type { Project } from "@/data/projects";
import { createClient } from "@/lib/supabase/server";

type ProjectMediaRow = {
  media_type: "image" | "video";
  url: string;
  display_order: number;
};

type ProjectRow = {
  slug: string;
  title: string;
  short_description: string;
  description: string;
  category: string;
  year: number | null;
  status: string;
  technologies: string[] | null;
  cover_image_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  featured: boolean;
  project_media: ProjectMediaRow[] | null;
};

function mapProject(row: ProjectRow): Project {
  const media = [...(row.project_media ?? [])].sort(
    (a, b) => a.display_order - b.display_order
  );

  return {
    // On utilise volontairement le slug comme id
    // pour conserver /projects/smart-station, etc.
    id: row.slug,

    title: row.title,

    shortDescription: row.short_description,

    description: row.description,

    category: row.category,

    year: row.year ? String(row.year) : "",

    status: row.status,

    technologies: row.technologies ?? [],

    featured: row.featured,

    image: row.cover_image_url ?? undefined,

    gallery: media
      .filter((item) => item.media_type === "image")
      .map((item) => item.url),

    videos: media
      .filter((item) => item.media_type === "video")
      .map((item) => item.url),

    github: row.github_url ?? undefined,

    demo: row.demo_url ?? undefined,
  };
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(`
      slug,
      title,
      short_description,
      description,
      category,
      year,
      status,
      technologies,
      cover_image_url,
      github_url,
      demo_url,
      featured,
      project_media (
        media_type,
        url,
        display_order
      )
    `)
    .eq("published", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Supabase projects error:", error);
    throw new Error(
      "Impossible de récupérer les projets depuis Supabase."
    );
  }

  return ((data ?? []) as ProjectRow[]).map(mapProject);
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(`
      slug,
      title,
      short_description,
      description,
      category,
      year,
      status,
      technologies,
      cover_image_url,
      github_url,
      demo_url,
      featured,
      project_media (
        media_type,
        url,
        display_order
      )
    `)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("Supabase project error:", error);

    throw new Error(
      "Impossible de récupérer le projet depuis Supabase."
    );
  }

  if (!data) {
    return null;
  }

  return mapProject(data as ProjectRow);
}