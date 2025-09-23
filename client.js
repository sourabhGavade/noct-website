import sanityClient from "@sanity/client"

export default sanityClient({
    projectId: "gaq4tq7o",
    dataset: "production",
    useCdn: true,
    apiVersion: '2021-04-20'
})