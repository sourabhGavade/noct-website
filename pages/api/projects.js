export default (req, res) => {
  res.statusCode = 200
  res.json({
    'projects': [
    // Project 1 - Mapro Signature
    {
      uid: 'mapro-signature',
      name: 'Mapro Signature',
      sections: [
        {
          type: "hero",
          bgColor: "#DEE8FF",
          title: "Mapro Signature Pouch",
          caption: "Packaging the goodness of real fruit with sugary sweetness",
          imgSrc: "/images/work/mapro-signature/hero.png",
          mobileImgSrc: "/images/work/mapro-signature/hero-mobile.png",
          marginBottom: "160px"
        },
        {
          type: "intro",
          introPara: "Mapro produces many things, including several different kinds of candy! From pulpy Faleros to juicy Falchoos to delicious Qubes, they have a wide array of sweets on sale. The funny thing is, you could’ve been eating Falero for years on end - without ever deducing they were coming out of Mapro factories. Mapro needed packaging that would tie it’s products together, so that consumers know they want to try a Qube if they loved those Faleros!",
          services: ["Brand Strategy", "Packaging"],
          industries: ["FMCG"],
          marginBottom: "130px"
        },
        {
          type: "fullWidthImage",
          imgSrc: "/images/work/mapro-signature/all-brands.png",
          marginBottom: "120px"
        },
        {
          type: "paraWithH3",
          title: "Brief",
          text: "Mapro wanted us to design fresh, premium new packages for all their candy products - binding them together under one large brand umbrella, to build the connect between all sub-candy-brands and Mapro, the mother brand.",
          marginBottom: "80px"
        },
        {
          type: "video",
          vidSrc: "/images/work/mapro-signature/mapro-brands-sign.mp4",
          marginBottom: "220px"
        },
        {
          type: "paraWithH2",
          title: "Our Intervention",
          text: "In order to build the connect between all sub brands, we came up with a ‘Mapro Signature’. The signature needed to be prominent and yet easily understood, so we chose to use the simplest and most recognisable element of the Mapro brand; its logo.",
          marginBottom: "80px"
        },
        {
          type: "paraWithH3",
          title: "The Mapro Signature",
          text: "Our primary challenge while using the logo as a signature was in integrating it with several candy sub-brand identities and designing the individual packs, while also ensuring both retain their individual values. The key lay in the treatment of the signature, rather than its printing, and the standardisation of all packs to a convenient and recognisably similar size. <br/><br/>At first sight, our new design will strike you as a Falero packet, but in the background, the packaging subtly displays a blown up version of the Mapro logo a metallic or UV treatment - to guarantee the connect between the two is strong, clear and long-lasting.",
          marginBottom: "80px"
        },
        {
          type: "imageCompare",
          beforeImgSrc: "/images/work/mapro-signature/4a-old.png",
          afterImgSrc: "/images/work/mapro-signature/4b-new.png",
          marginBottom: "220px"
        },
        {
          type: "paraWithH3",
          title: "Features",
          text: "Discover some design-details we paid attention to… ",
          marginBottom: "20px"
        },
        {
          type: "sectionalCarousel",
          slides: [
            {
              bgColor: "#F9F0D6",
              title: "Treatment of Signature",
              description: "Reduced opacity of the print in the laminates’ pvc layer in the form of the Mapro signature resulted in a metallic sheen of that shape from the metal layer below. This technique reduced costs and achieved high visibility for Mapro. For certain candies, a UV effect was used instead. From afar, each pouch proclaims its individual branding but upon closer inspection, it’s hard to miss the Mapro branding!",
              imgSrc: "/images/work/mapro-signature/feature-1.png"
            },
            {
              bgColor: "#E1F6FF",
              title: "Transparent Window",
              description: "Based on local research, we learned that customers like to see their candy before they purchase it, so we created a transparent window cut out on the back of the pack, ensuring an easy turn-over-and-view experience for all to directly look inside and see the Falero, and other candy they know and love.",
              imgSrc: "/images/work/mapro-signature/feature-2.png"
            },
            {
              bgColor: "rgba(240,233,255,0.74)",
              title: "Custom Window Cut Out",
              description: "The custom window cut out design works around possible display mistakes in stores. In case the pouch has been placed on a shelf backwards, a secondary layer of product information is made available for all via the shape of the cut out. The fruit-shape is telling of the flavour and the candy shape informs its respective candy brand.",
              imgSrc: "/images/work/mapro-signature/feature-3.png"
            }
          ],
          marginBottom: "220px"
        },
        {
          type: "paraWithH3",
          title: "Key Line Diagram",
          text: "The seal-tear-off notch was placed above the Mapro Signature, ensuring the logo remains on the pouch. Above the seal, a punched hole allows sellers an easy hang-and-display. Once the pouch has been purchased and the seal off and there is predictably no more use for the punched hole - it has done its job as designed, and can now be discarded.",
          marginBottom: "80px"
        },
        {
          type: "largeImage",
          imgSrc: "/images/work/mapro-signature/key-line-diagram.png",
          marginBottom: "80px"
        },
        {
          type: "video",
          vidSrc: "/images/work/mapro-signature/key-line-video.mp4",
          marginBottom: "220px"
        },
        {
          type: "paraWithH2",
          title: "Application",
          text: "We completely redesigned the packaging for Falero, Qubes, Fruity Sweets, Sparky and Falchoos. The Coolio, Frubbles and Cafero packet designs were directed by us but executed by external agencies or designers. In total, 8 pouch designs were adapted and 5 were redesigned completely.",
          marginBottom: "80px"
        },
        {
          type: "imageCompare",
          beforeImgSrc: "/images/work/mapro-signature/old-packaging.png",
          afterImgSrc: "/images/work/mapro-signature/new-packaging.png",
          marginBottom: "45px"
        },
        {
          type: "video",
          vidSrc: "/images/work/mapro-signature/store-video.mp4",
          marginBottom: "45px"
        },
        {
          type: "largeImage",
          imgSrc: "/images/work/mapro-signature/store-pic-1.png",
          marginBottom: "45px"
        },
        {
          type: "largeImage",
          imgSrc: "/images/work/mapro-signature/store-pic-2.png",
          marginBottom: "200px"
        },
      ]
    },
    // Project 2 - ALT-EFF
    {
      uid: 'alt-eff',
      name: 'All Living Things - Environmental Film Festival',
      sections: [
        {
          type: "hero",
          bgColor: "#F3BB5B",
          title: "All Living Things - Environmental Film Festival",
          caption: "Solving real world problems: Event branding an environmental film festival!",
          imgSrc: "/images/work/alt-eff/hero.png",
          mobileImgSrc: "/images/work/alt-eff/hero-mobile.png",
          marginBottom: "160px"
        },
        {
          type: "intro",
          introPara: "The All Living Things Environmental Film Festival began with us, as a community-building platform to showcase up and coming filmmakers and environmentalists. We were with ALT EFF every step of the way, from creating brand strategy and working on social media to crafting unique event design features. Our objective was to make the heavy, hard-hitting nature of the event more accessible, palpable and lively for our audience.",
          services: ["Brand & Identity", "Brand Strategy", "Social Media", "Event Design"],
          industries: ["Motion Picture"],
          marginBottom: "130px"
        },
        {
          type: "paraWithH3",
          title: "Nomenclature",
          text: "The brand name, ALT EFF, is an acronym for ‘All Living Things Environmental Film Festival’ which acknowledges and encompasses every living thing that exists and advocates for them via the cinematic medium. The first half of the name ‘ALT’, also hints at an ‘alternative’ sustainable lifestyle - which is communicated as the need of the hour.",
          marginBottom: "80px"
        },
        {
          type: "gif",
          imgSrc: "/images/work/alt-eff/2-nomenclature.gif",
          marginBottom: "220px"
        },
        {
          type: "paraWithH2",
          title: "Brand & Identity",
          text: "The identity of this brand was born to be light-hearted, fun, contemporary and easy to swallow - keeping in mind the dark and drastic future ahead of us, as we move further into the climate crisis while keeping hope alive.",
          marginBottom: "60px"
        },
        {
          type: "paraWithH3",
          title: "Logo",
          text: "After several hours of brainstorming and ideating, the ALT EFF logo was created by visualising three crucial elements - humanity, the environment and the universe.. The logomark has three interconnected blobs overlapping each other, representing these three groups and signifying their interconnectedness, with a white, leaf-vein detail running over one of the blobs, delicately binding them together.",
          marginBottom: "60px"
        },
        {
          type: "gif",
          imgSrc: "/images/work/alt-eff/3-logo-evolution.gif",
          marginBottom: "220px"
        },
        {
          type: "paraWithH3",
          title: "Visual Language",
          text: "We designed ALT EFFs visual language using two primary graphical elements - solid coloured blobs and organic lines, which are used in varying combinations, organised aesthetically in clusters and combined to create meaningful visuals. The bubbles are an additional graphical element that can be spread out and used to fill out empty spaces or create unique and colourful compositions. The bubbles vary in size, shape and form, and never overlap each other - but can overlap any other elements.",
          marginBottom: "80px"
        },
        {
          type: "largeImage",
          imgSrc: "/images/work/alt-eff/4-typography.png",
          marginBottom: "80px"
        },
        {
          type: "largeImage",
          imgSrc: "/images/work/alt-eff/5-visual-language.png",
          marginBottom: "80px",
        },
        {
          type: "splitImage",
          img1Src: "/images/work/alt-eff/6-poster.png",
          img1Caption: "Poster",
          img2Src: "/images/work/alt-eff/7-leaflet.png",
          img2Caption: "Leaflet",
          marginBottom: "160px"
        },
        {
          type: "paraWithH4",
          title: "Acolades that stand out!",
          text: "The ALT EFF accolades were uniquely designed bearing in mind the brand’s playful and pleasant approach. It’s soft curves also pay tribute to small elements of nature: leaves and budding flowers.",
          marginBottom: "80px"
        },
        {
          type: "largeImage",
          imgSrc: "/images/work/alt-eff/8-acolades.png",
          marginBottom: "220px"
        },
        {
          type: "paraWithH2",
          title: "Video & Motion Graphics",
          text: "During the months approaching the festival, a teaser, trailer and preroll were created - keeping the consistency of the brand messaging alive in video format. The motion graphics incorporated the visual language and the videos fused and emphasized upon all three logo elements - humanity, the environment and the universe.",
          marginBottom: "80px"
        },
        {
          type: "video",
          vidSrc: "/images/work/alt-eff/9-teaser.mp4",
          vidCaption: "Festival Teaser",
          // marginBottom: "80px",
          marginBottom: "220px"
        },
        // {
        //   type: "video",
        //   vidSrc: "/images/work/alt-eff/10-trailer.mp4",
        //   vidCaption: "Festival Trailer",
        //   marginBottom: "220px"
        // },
        {
          type: "paraWithH2",
          title: "Virtual Festival Experience",
          text: "Making use of multiple online platforms including Zoom and Eventive, we built a virtual film festival experience from the ground up. We branded, marketed and conducted fifteen virtual workshops, panel discussions, screenings and engaging conversations. Dedicated individuals from the spheres of cinema and conservation came together to help us create a wholesome and fruitful virtual experience.",
          marginBottom: "80px"
        },
        {
          type: "video",
          vidSrc: "/images/work/alt-eff/11-scroll-mock.mp4",
          vidCaption: "Virtual Festival Experience and Organisation Website",
          marginBottom: "220px"
        },
        {
          type: "paraWithH2",
          title: "Social Media",
          text: "Each post was hand crafted to promote online events, knowledge sharing campaigns, ticket giveaway competitions and more. Naturally, the visual language was assimilated into each post, successfully creating cheer amongst ALT EFFs growing online community, and therefore ensuring conversions.",
          marginBottom: "80px"
        },
        {
          type: "video",
          vidSrc: "/images/work/alt-eff/12-insta-scroll.mp4",
          marginBottom: "80px"
        },
        {
          type: "largeImage",
          imgSrc: "/images/work/alt-eff/13-wormrani.png",
          marginBottom: "80px"
        },
        {
          type: "largeImage",
          imgSrc: "/images/work/alt-eff/14-mobile-mocks.png",
          marginBottom: "160px"
        },
        {
          type: "paraWithH4",
          title: "Colour coded posts",
          text: "To maintain consistency in the visual flow of the social media posts and the Instagram grid, posts were colour coded based on their content. Orange for alerts or reminders, yellow and white for general brand related posts, blue for event announcers and green for miscellaneous posting.",
          marginBottom: "80px"
        },
        {
          type: "largeImage",
          imgSrc: "/images/work/alt-eff/15-colour-coded.png",
          marginBottom: "160px"
        },
        {
          type: "paraWithH4",
          title: "Highlights",
          text: "Custom highlights were designed and produced for ALT EFFs official Instagram stories, incorporating the brand’s personality, it’s visual language and colour codes!",
          marginBottom: "80px"
        },
        {
          type: "mobileCarousel",
          slides: [
            { imgSrc: "/images/work/alt-eff/16-1.png" },
            { imgSrc: "/images/work/alt-eff/16-2.png" },
            { imgSrc: "/images/work/alt-eff/16-3.png" },
            { imgSrc: "/images/work/alt-eff/16-4.png" },
            { imgSrc: "/images/work/alt-eff/16-5.png" },
            { imgSrc: "/images/work/alt-eff/16-6.png" },
            { imgSrc: "/images/work/alt-eff/16-7.png" }
          ],
          marginBottom: "220px"
        },
        {
          type: "paraWithH4",
          title: "Event Slider Posts",
          text: "With an undeniable attention to detail, we took it one step forward when composing the final event slider posts to advertise the opening and closing events scheduled to take place on the first and last days of the festival. We repurposed our base graphical elements - blobs and bubbles - to craft intricate visual imagery that helped communicate what each event was about, and voila!",
          marginBottom: "80px"
        },
        {
          type: "fullWidthImage",
          imgSrc: "/images/work/alt-eff/17-event.png",
          marginBottom: "220px"
        },
        {
          type: "paraWithH2",
          title: "Impact",
          text: "ALT EFF - an entirely virtual experience in its first year - started out with a meagre 59 followers on Instagram and organically grew to hold an audience of about 2,200 people in less than 6 months. Over the course of those same months, ALT EFF received one hundred, absolutely incredible film submissions from several countries around the world. In December 2020, over 300 people bought tickets to watch the films that were selected. ALT EFF also hosted 5 successful pre-festival events and screenings, and 10 engaging talks during the actual festival period, with over 1400 people attending and interacting. Via the medium of film and education, ALT EFF aspires to make on-ground and positive impact on local ecology - and local communities -  in the coming years.",
          marginBottom: "80px"
        },
        {
          type: "largeImage",
          imgSrc: "/images/work/alt-eff/18-impact.png",
          marginBottom: "220px"
        }
      ]
    }
  ]})
}
