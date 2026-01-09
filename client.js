import sanityClient from "@sanity/client"

export default sanityClient({
    projectId: "gaq4tq7o",
    dataset: "production",
    useCdn: true,
    apiVersion: '2023-05-03' // Updated to newer API version
})