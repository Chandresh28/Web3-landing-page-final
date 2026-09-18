/* =========================================================
   WEB3 LANDING PAGE
   JavaScript
   ========================================================= */


/* =========================================================
   1. WAIT FOR THE PAGE TO LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       2. 3D TILT EFFECT FOR CONCEPT CARDS
       ===================================================== */

    const cards = document.querySelectorAll(".concept-card");


    cards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;


            // Convert mouse position into a small rotation

            const rotateY =
                ((mouseX / rect.width) - 0.5) * 5;

            const rotateX =
                ((mouseY / rect.height) - 0.5) * -5;


            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(800px) rotateX(0deg) rotateY(0deg)";
        });

    });



    /* =====================================================
       3. NAVIGATION ACTIVE STATE
       ===================================================== */

    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll(".navbar nav a");


    const updateNavigation = () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.style.color = "#9b9ca5";

            const target =
                link.getAttribute("href").substring(1);


            if (target === currentSection) {

                link.style.color = "#ffffff";

            }

        });

    };


    window.addEventListener("scroll", updateNavigation);

    updateNavigation();



    /* =====================================================
       4. SUBTLE NETWORK NODE INTERACTION
       ===================================================== */

    const networkNodes =
        document.querySelectorAll(".network-node");


    networkNodes.forEach((node) => {

        node.addEventListener("mouseenter", () => {

            node.style.transform = "scale(2)";

        });


        node.addEventListener("mouseleave", () => {

            node.style.transform = "scale(1)";

        });

    });



    /* =====================================================
       5. REDUCED MOTION SUPPORT
       ===================================================== */

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    if (prefersReducedMotion) {

        cards.forEach((card) => {

            card.style.transition = "none";

        });

    }


});