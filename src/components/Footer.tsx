import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SocialIcons } from "@/components/SocialIcons";

const Footer = () => (
  <footer className="bg-white text-gray-900 py-8 md:py-10 border-t border-gray-200">
    <div className="container max-w-7xl mx-auto mobile-padding">
      {/* Footer Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-6 md:mb-8">
        {/* Company Info + Social Icons */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-2 mb-4">
            <img
              src="uploads/01_CYBAEM TECH Logo 2026 PNG 1.png"
              alt="CybaemTech Logo"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Beyond Limits. Transforming businesses through innovative technology
            solutions and strategic digital partnerships.
          </p>
          <SocialIcons variant="footer" className="mb-4" iconSize={20} />
          <div className="flex space-x-4">
            <Button
              size="sm"
              variant="default"
              onClick={() =>
                (window.location.href = "/contact?source=footer-cta")
              }
              className="text-xs md:text-sm font-medium bg-[#14539a] hover:bg-[#14539a]/90 text-white px-3 py-2"
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* Solutions Section */}
        <div>
          <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-900">
            Solutions
          </h3>
          <ul className="space-y-2">
            {[
              "cloud-solutions",
              "enterprise-solutions",
              "cybersecurity-services",
              "ai-data-analytics",
              "digital-marketing",
              "managed-services",
            ].map((path) => (
              <li key={path}>
                <a
                  href={`/${path}`}
                  className="text-gray-600 hover:text-[#14539a] text-sm transition-colors block py-0.5"
                >
                  {path
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Industries Section */}
        <div>
          <div className="border-t border-gray-200 pt-4 mb-4 md:hidden"></div>
          <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-900">
            Industries
          </h3>
          <ul className="space-y-2">
            {[
              "manufacturing",
              "healthcare",
              "finance",
              "retail",
              "education",
              "technology",
            ].map((id) => (
              <li key={id}>
                <a
                  href={`/industries#${id}`}
                  className="text-gray-600 hover:text-primary text-sm transition-colors block py-0.5"
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <div className="border-t border-gray-200 pt-4 mb-4 md:hidden"></div>
          <h3 className="text-base md:text-lg font-semibold mb-4 text-gray-900">
            Company
          </h3>
          <ul className="space-y-2">
            {["about", "leadership", "careers"].map((path) => (
              <li key={path}>
                <a
                  href={`/${path}`}
                  className="text-gray-600 hover:text-[#14539a] text-sm transition-colors block py-0.5"
                >
                  {path
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/resources"
                className="text-gray-600 hover:text-primary text-sm transition-colors block py-0.5"
              >
                Case Studies
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Separator className="bg-gray-200 mb-4" />

      {/* Bottom Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} CybaemTech. All rights reserved.
        </div>
        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
          <a
            href="/privacy-policy"
            className="text-gray-500 hover:text-primary transition-colors touch-target"
          >
            Privacy Policy
          </a>
          <a
            href="/privacy-policy#third-party"
            className="text-gray-500 hover:text-primary transition-colors touch-target"
          >
            Terms of Service
          </a>
          <a
            href="/privacy-policy#cookies"
            className="text-gray-500 hover:text-primary transition-colors touch-target"
          >
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
