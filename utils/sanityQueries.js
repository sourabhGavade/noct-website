// Common GROQ queries for the NOCT website

// Projects queries
export const projectsQuery = `
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    subtitle,
    description,
    featuredImage {
      asset->,
      alt
    },
    category,
    clientName,
    projectUrl,
    featured,
    publishedAt
  }
`

export const featuredProjectsQuery = `
  *[_type == "project" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    subtitle,
    description,
    featuredImage {
      asset->,
      alt
    },
    category,
    clientName,
    projectUrl,
    publishedAt
  }
`

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    subtitle,
    description,
    featuredImage {
      asset->,
      alt
    },
    gallery[] {
      asset->,
      alt,
      caption
    },
    content,
    technologies,
    category,
    clientName,
    projectUrl,
    publishedAt,
    seo
  }
`

// Blog queries
export const blogPostsQuery = `
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
      asset->,
      alt
    },
    category,
    tags,
    author->{
      name,
      profileImage {
        asset->,
        alt
      }
    },
    featured,
    publishedAt
  }
`

export const blogPostBySlugQuery = `
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
      asset->,
      alt
    },
    content,
    category,
    tags,
    author->{
      name,
      position,
      profileImage {
        asset->,
        alt
      }
    },
    publishedAt,
    seo
  }
`

// Services queries
export const servicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    icon {
      asset->
    },
    featuredImage {
      asset->,
      alt
    },
    features,
    pricing,
    featured,
    order
  }
`

export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    description,
    icon {
      asset->
    },
    featuredImage {
      asset->,
      alt
    },
    features,
    process,
    pricing,
    seo
  }
`

// Testimonials queries
export const testimonialsQuery = `
  *[_type == "testimonial"] | order(order asc) {
    _id,
    clientName,
    clientPosition,
    companyName,
    testimonial,
    clientImage {
      asset->,
      alt
    },
    companyLogo {
      asset->
    },
    rating,
    project->{
      title,
      slug
    },
    featured
  }
`

export const featuredTestimonialsQuery = `
  *[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    clientName,
    clientPosition,
    companyName,
    testimonial,
    clientImage {
      asset->,
      alt
    },
    companyLogo {
      asset->
    },
    rating,
    project->{
      title,
      slug
    }
  }
`

// Awards queries
export const awardsQuery = `
  *[_type == "award"] | order(year desc) {
    _id,
    title,
    organization,
    year,
    category,
    description,
    awardImage {
      asset->,
      alt
    },
    certificateUrl,
    project->{
      title,
      slug
    },
    featured
  }
`

export const featuredAwardsQuery = `
  *[_type == "award" && featured == true] | order(year desc) {
    _id,
    title,
    organization,
    year,
    category,
    description,
    awardImage {
      asset->,
      alt
    },
    certificateUrl,
    project->{
      title,
      slug
    }
  }
`

// Team queries
export const teamQuery = `
  *[_type == "team"] | order(order asc) {
    _id,
    name,
    slug,
    position,
    profileImage {
      asset->,
      alt
    },
    socialLinks,
    skills,
    featured
  }
`

export const teamMemberBySlugQuery = `
  *[_type == "team" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    position,
    bio,
    profileImage {
      asset->,
      alt
    },
    email,
    socialLinks,
    skills
  }
`

// Courses queries
export const coursesQuery = `
  *[_type == "course" && published == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    shortDescription,
    featuredImage {
      asset->,
      alt
    },
    instructor->{
      name,
      profileImage {
        asset->,
        alt
      }
    },
    duration,
    level,
    category,
    price,
    featured
  }
`

export const courseBySlugQuery = `
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    description,
    featuredImage {
      asset->,
      alt
    },
    instructor->{
      name,
      position,
      profileImage {
        asset->,
        alt
      }
    },
    duration,
    level,
    category,
    price,
    curriculum,
    enrollmentUrl,
    seo
  }
`
