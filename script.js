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
// ===============================
// SCROLL REVEAL
// ===============================

const revealElements = document.querySelectorAll(
    ".evolution-line, .concept-card, .flow-step, .real-world-card, .cta"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                // Element is visible
                entry.target.classList.add("show");

            } else {

                // Element left the screen
                entry.target.classList.remove("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});
// ===============================
// ACTIVE NAVIGATION
// ===============================

const navLinks = document.querySelectorAll(".navbar nav a");

const navSections = document.querySelectorAll(
    "#home, #evolution, #concepts, #how-it-works, #real-world"
);

const navObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.navbar nav a[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }

        });

    },
    {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    }
);

navSections.forEach((section) => {
    navObserver.observe(section);
});
// ===============================
// INTERACTIVE WEB3 FLOW
// ===============================

const flowSteps = document.querySelectorAll(".flow-step");
const flowDetail = document.querySelector("#flow-detail");

const flowInfo = {
    you: {
        title: "You",
        text: "You interact with a Web3 application and initiate an action, such as transferring an asset or interacting with a smart contract."
    },

    wallet: {
        title: "Wallet",
        text: "Your wallet can hold digital assets and cryptographic keys, and can be used to approve or sign transactions."
    },

    blockchain: {
        title: "Blockchain",
        text: "The network processes and records the transaction according to its rules and consensus mechanism."
    },

    contract: {
        title: "Smart Contract",
        text: "If a smart contract is involved, its programmed conditions determine what happens when the transaction is executed."
    }
};

flowSteps.forEach((step) => {

    step.addEventListener("click", () => {

        const selectedStep = step.dataset.step;
        const info = flowInfo[selectedStep];

        flowSteps.forEach((item) => {
            item.classList.remove("selected");
        });

        step.classList.add("selected");

        flowDetail.innerHTML = `
            <p class="flow-detail-label">STEP ${selectedStep.toUpperCase()}</p>
            <h3>${info.title}</h3>
            <p>${info.text}</p>
        `;
    });

});
// ===============================
// WALLET CONNECTION
// ===============================

const connectWalletButton = document.querySelector("#connect-wallet");

let walletAddress = null;

function shortenAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

async function connectWallet() {

    if (!window.ethereum) {
        connectWalletButton.textContent = "Install MetaMask";
        return;
    }

    try {

        connectWalletButton.disabled = true;
        connectWalletButton.textContent = "Connecting...";

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        handleWalletAccounts(accounts);

    } catch (error) {

        console.error("Wallet connection failed:", error);

        if (error.code === 4001) {
            connectWalletButton.textContent = "Connection Rejected";
        } else {
            connectWalletButton.textContent = "Try Again";
        }

    } finally {

        connectWalletButton.disabled = false;

        setTimeout(() => {

            if (walletAddress) {
                connectWalletButton.textContent =
                    shortenAddress(walletAddress);
            }

        }, 1200);
    }
}


function handleWalletAccounts(accounts) {

    if (!accounts || accounts.length === 0) {

        walletAddress = null;

        connectWalletButton.textContent = "Connect Wallet";

        connectWalletButton.classList.remove("connected");

        return;
    }

    walletAddress = accounts[0];

    connectWalletButton.textContent =
        shortenAddress(walletAddress);

    connectWalletButton.classList.add("connected");
}


connectWalletButton.addEventListener("click", connectWallet);


if (window.ethereum) {

    window.ethereum.on("accountsChanged", handleWalletAccounts);

}