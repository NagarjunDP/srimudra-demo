import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
    const siteTitle = "Srimudra Events - Hyderabad's Premier Luxury Event Planners";
    const defaultDescription = "RANKED #1 Wedding & Event Planner in Hyderabad. We create timeless, luxury weddings, corporate galas, and birthday bashes. 5-Star Rated Management.";
    const siteUrl = url || "https://srimudraevents.com";
    const siteImage = image || "https://srimudraevents.com/og-image.jpg";

    const schemaCallback = () => {
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "EventPlanner",
            "name": "Srimudra Events",
            "image": [
                "https://srimudraevents.com/logo.png"
            ],
            "@id": "https://srimudraevents.com",
            "url": "https://srimudraevents.com",
            "telephone": "+91XXXXXXXXXX",
            "email": "info@srimudraevents.com",
            "priceRange": "₹₹-₹₹₹₹",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jubilee Hills",
                "addressLocality": "Hyderabad",
                "addressRegion": "Telangana",
                "postalCode": "500033",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 17.3850,
                "longitude": 78.4867
            },
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                ],
                "opens": "09:00",
                "closes": "22:00"
            },
            "sameAs": [
                "https://www.instagram.com/srimudra_events",
                "https://www.facebook.com/srimudraevents"
            ],
            "areaServed": [
                { "@type": "City", "name": "Hyderabad" },
                { "@type": "City", "name": "Secunderabad" },
                { "@type": "City", "name": "Telangana" },
                { "@type": "City", "name": "Banjara Hills" },
                { "@type": "City", "name": "Jubilee Hills" },
                { "@type": "City", "name": "Gachibowli" }
            ],
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Luxury Event Services",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Luxury Wedding Planning",
                            "description": "Premium destination wedding decor, logistics, and management."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Corporate Event Management",
                            "description": "High-profile conferences, product launches, and gala dinners."
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Themed Birthday Parties",
                            "description": "Exclusive themes for kids and milestone birthdays."
                        }
                    }
                ]
            }
        };

        return JSON.stringify(schemaData);
    };

    return (
        <Helmet>
            <title>{title ? `${title} | Srimudra Events` : siteTitle}</title>
            <meta name="title" content={title ? `${title} | Srimudra Events` : siteTitle} />
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content="event management companies in hyderabad, wedding planners hyderabad, best event organizers hyderabad, luxury wedding decor hyderabad, corporate event management hyderabad, birthday party organizers hyderabad, srimudra events" />

            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:image" content={siteImage} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={title || siteTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />
            <meta property="twitter:image" content={siteImage} />

            {/* Schema.org markup for LocalBusiness */}
            <script type="application/ld+json">
                {schemaCallback()}
            </script>
        </Helmet>
    );
};

export default SEO;
