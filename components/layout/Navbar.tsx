"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ImageIcon,
  Home,
  Layout,
  Heart,
  Box,
  User,
  Scissors,
  Camera,
} from "lucide-react";
import Navbarfetchname from "../shared/NavbarFetchName";

const services = [
  {
    name: "Real Estate",
    submenu: [
      {
        name: "Single Exposure",
        href: "/service/real-estate/single-explosure",
      },
      {
        name: "HDR Basic",
        href: "/service/real-estate/hdr-basic",
      },
      {
        name: "HDR Premium",
        href: "/service/real-estate/hdr-preminum",
      },
      {
        name: "Flambient Editing",
        href: "/service/real-estate/flambient-editing",
      },
      {
        name: "Manual Blending",
        href: "/service/real-estate/manual-blending",
      },
      {
        name: "Architecture Retouching",
        href: "/service/real-estate/architecture-retouch",
      },
      {
        name: "Day To Dusk",
        href: "/service/real-estate/day-to-dusk",
      },
      {
        name: "De-Clutter Objects",
        href: "/service/real-estate/digital-declutter",
      },
      {
        name: "UAV Retouching",
        href: "/service/real-estate/uav-retouching",
      },
      {
        name: "Virtual Staging",
        href: "/service/real-estate/virtual-staging",
      },
      {
        name: "Floor Plans",
        href: "/service/real-estate/2d-3d-floor-plans",
      },
    ],
  },

  {
    name: "3D Services",
    submenu: [
      {
        name: "3D Floor Plan",
        href: "/service/3d-services/3d-floor-plan",
      },
      {
        name: "3D Rendering",
        href: "/service/3d-services/3d-rendering",
      },
    ],
  },

  {
    name: "Wedding & Events",
    submenu: [
      {
        name: "Perfect Color Balance",
        href: "/service/wedding-events/perfect-color-balance",
      },
      {
        name: "Color Balance + Culling",
        href: "/service/wedding-events/perfect-color-balance-culling",
      },
      {
        name: "Wedding Retouch",
        href: "/service/wedding-retouching",
      },
      {
        name: "Album Retouch",
        href: "/service/wedding-events/album-retouch",
      },
    ],
  },

  {
    name: "Product Ecommerce",
    submenu: [
      {
        name: "Product Retouching",
        href: "/service/commercial/products-apparel-footwear-furniture",
      },
      {
        name: "Jewelry",
        href: "/service/commercial/jewelry",
      },
      {
        name: "Ghost Mannequin",
        href: "/service/commercial/ghost-mannequin",
      },
      {
        name: "Product Composite",
        href: "/service/commercial/photo-composite",
      },
    ],
  },

  {
    name: "People Retouching",
    submenu: [
      {
        name: "Portrait Retouch",
        href: "/service/people/portrait-headshots-studio",
      },
      {
        name: "Corporate Headshots",
        href: "/service/people/corporate-professional-headshots",
      },
      {
        name: "Pregnancy Retouch",
        href: "/service/people/maternity-pregnancy-retouch",
      },
      {
        name: "Baby Retouch",
        href: "/service/people/new-born",
      },
      {
        name: "School Retouching",
        href: "/service/people/school",
      },
      {
        name: "Sports Retouching",
        href: "/service/people/sports",
      },
      {
        name: "Fashion Retouching",
        href: "/service/people/fashion-glamour",
      },
    ],
  },

  {
    name: "Clipping Path",
    submenu: [
      {
        name: "Clipping Path",
        href: "/service/clipping-path-extraction/clipping-path",
      },
      {
        name: "Extraction",
        href: "/service/clipping-path-extraction/extraction",
      },
    ],
  },

  {
    name: "Custom Payment",
    submenu: [
      {
        name: "Pay Now",
        href: "/pay",
      },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);

  const [serviceOpen, setServiceOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);

  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [mobileActiveService, setMobileActiveService] = useState<string | null>(
    null,
  );

  const [scrolled, setScrolled] = useState(false);

  const serviceRef = useRef<HTMLLIElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  /*
   * ------------------------------------------------------------
   * SCROLL + OUTSIDE CLICK
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        serviceRef.current &&
        !serviceRef.current.contains(e.target as Node)
      ) {
        setServiceOpen(false);
        setActiveService(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);

      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, []);

  /*
   * ------------------------------------------------------------
   * ACTIVE SERVICE
   * ------------------------------------------------------------
   */

  const isServiceRoute = pathname?.startsWith("/service/") ?? false;

  const currentServiceCategory =
    services.find((service) =>
      service.submenu.some((item) => item.href === pathname),
    )?.name ?? null;

  const dropdownActiveService =
    activeService ?? currentServiceCategory ?? services[0]?.name;

  const activeCategory =
    services.find((service) => service.name === dropdownActiveService) ??
    services[0];

  const selectedServiceItem =
    activeCategory.submenu.find((item) => item.href === pathname) ??
    activeCategory.submenu[0];

  /*
   * ------------------------------------------------------------
   * CATEGORY ICON
   * ------------------------------------------------------------
   */

  const categoryIcon = (name: string) => {
    switch (true) {
      case name.includes("Real Estate"):
        return <Home size={16} className="text-red-500" />;

      case name.includes("3D"):
        return <Layout size={16} className="text-red-500" />;

      case name.includes("Wedding"):
        return <Heart size={16} className="text-red-500" />;

      case name.includes("Product"):
        return <Box size={16} className="text-red-500" />;

      case name.includes("People"):
        return <User size={16} className="text-red-500" />;

      case name.includes("Clipping"):
        return <Scissors size={16} className="text-red-500" />;

      default:
        return <Camera size={16} className="text-red-500" />;
    }
  };

  /*
   * ------------------------------------------------------------
   * CLOSE MOBILE MENU
   * ------------------------------------------------------------
   */

  const closeAll = () => {
    setMobileOpen(false);
    setMobileServiceOpen(false);
    setMobileActiveService(null);
  };

  /*
   * ------------------------------------------------------------
   * RENDER
   * ------------------------------------------------------------
   */

  return (
    <>
      <header
        className={`sticky left-0 right-0 top-0 z-[9999] transition-all duration-300 ${
          scrolled
            ? "border-b border-gray-100 bg-white/95 shadow-lg backdrop-blur-md"
            : "border-b border-gray-100 bg-white shadow-sm"
        }`}
      >
        {/* =====================================================
            HEADER CONTAINER
        ===================================================== */}

        <div
          className="
            mx-auto
            w-full
            max-w-[1400px]
            px-4
            sm:px-6
            lg:px-8
            xl:max-w-[1520px]
            2xl:max-w-[1640px]
            2xl:px-10
          "
        >
          <div
            className="
              flex
              h-20
              items-center
              justify-between
              lg:h-[88px]
              xl:h-[92px]
              2xl:h-[96px]
            "
          >
            {/* =================================================
                LOGO
            ================================================= */}

            <Link
              href="/"
              className="flex shrink-0 items-center"
              onClick={closeAll}
            >
              <Image
                src="/toWEBP/snappeditt.webp"
                alt="Snappeditt Logo"
                width={160}
                height={160}
                priority
                className="
                  h-[120px]
                  w-[120px]
                  object-contain
                  lg:h-[130px]
                  lg:w-[130px]
                  xl:h-[140px]
                  xl:w-[140px]
                  2xl:h-[150px]
                  2xl:w-[150px]
                "
              />
            </Link>

            {/* =================================================
                DESKTOP NAV
            ================================================= */}

            <nav
              className={`
                hidden
                items-center
                gap-6
                transition
                duration-200
                lg:flex
                xl:gap-9
                2xl:gap-10
                ${
                  serviceOpen
                    ? "rounded-full bg-red-50 px-4 py-2 shadow-sm ring-1 ring-red-100"
                    : ""
                }
              `}
            >
              {/* HOME */}

              <Link
                href="/"
                className={`whitespace-nowrap text-sm font-medium transition-colors duration-200 xl:text-[15px] ${
                  pathname === "/"
                    ? "text-red-500"
                    : "text-black hover:text-red-500"
                }`}
              >
                Home
              </Link>

              {/* ABOUT */}

              <Link
                href="/about-us"
                className={`whitespace-nowrap text-sm font-medium transition-colors duration-200 xl:text-[15px] ${
                  pathname === "/about-us"
                    ? "text-red-500"
                    : "text-black hover:text-red-500"
                }`}
              >
                About Us
              </Link>

              {/* =================================================
                  SERVICES MEGA DROPDOWN
              ================================================= */}

              <li
                ref={serviceRef}
                className="relative list-none"
                onMouseEnter={() => {
                  if (closeTimeoutRef.current) {
                    window.clearTimeout(closeTimeoutRef.current);
                    closeTimeoutRef.current = null;
                  }

                  setServiceOpen(true);

                  setActiveService(
                    currentServiceCategory ??
                      services[0]?.name ??
                      null,
                  );
                }}
                onMouseLeave={() => {
                  closeTimeoutRef.current = window.setTimeout(() => {
                    setServiceOpen(false);
                    setActiveService(null);
                    closeTimeoutRef.current = null;
                  }, 250);
                }}
              >
                {/* SERVICES BUTTON */}

                <button
                  type="button"
                  onClick={() => {
                    setServiceOpen((prev) => !prev);

                    setActiveService(
                      currentServiceCategory ??
                        services[0]?.name ??
                        null,
                    );
                  }}
                  className={`
                    flex
                    items-center
                    gap-1
                    whitespace-nowrap
                    text-sm
                    font-medium
                    transition-colors
                    duration-200
                    xl:text-[15px]
                    ${
                      serviceOpen || isServiceRoute
                        ? "text-red-500"
                        : "text-black hover:text-red-500"
                    }
                  `}
                >
                  Services

                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${
                      serviceOpen ? "rotate-180" : ""
                    } ${
                      serviceOpen || isServiceRoute
                        ? "text-red-500"
                        : "text-black"
                    }`}
                  />
                </button>

                {/* =================================================
                    HOVER BRIDGE

                    Wide enough for the larger desktop dropdown.
                ================================================= */}

                {/* =================================================
                    DESKTOP DROPDOWN
                ================================================= */}

                <div
                  className={`
                    absolute
                    left-1/2
                    top-[calc(100%+20px)]
                    z-[100]
                    -translate-x-1/2
                    pt-4
                    transition-all
                    duration-200
                    ${
                      serviceOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0"
                    }
                  `}
                >
                  {/* DROPDOWN ARROW */}

                  <div
                    className="
                      absolute
                      -top-[7px]
                      left-1/2
                      z-10
                      h-3.5
                      w-3.5
                      -translate-x-1/2
                      rotate-45
                      rounded-sm
                      border-l
                      border-t
                      border-gray-100
                      bg-white
                    "
                  />

                  {/* =================================================
                      MEGA MENU

                      Responsive widths:
                      lg  : fits laptop
                      xl  : larger
                      2xl : very large
                  ================================================= */}

                  <div
                    className="
                      relative
                      grid
                      w-[calc(100vw-32px)]
                      max-w-[1100px]
                      grid-cols-[230px_300px_minmax(0,1fr)]
                      overflow-hidden
                      rounded-2xl
                      border
                      border-gray-100
                      bg-white
                      shadow-2xl
                      xl:max-w-[1250px]
                      xl:grid-cols-[280px_350px_minmax(0,1fr)]
                      2xl:max-w-[1400px]
                      2xl:grid-cols-[300px_380px_minmax(0,1fr)]
                    "
                  >
                    {/* =================================================
                        LEFT — CATEGORIES
                    ================================================= */}

                    <div
                      className="
                        border-r
                        border-gray-100
                        bg-gray-50
                        px-3
                        py-5
                        xl:px-4
                      "
                    >
                      <p
                        className="
                          px-3
                          pb-3
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-gray-400
                        "
                      >
                        Categories
                      </p>

                      <div className="space-y-1">
                        {services.map((s) => {
                          const isActive =
                            dropdownActiveService === s.name;

                          return (
                            <button
                              key={s.name}
                              type="button"
                              onMouseEnter={() =>
                                setActiveService(s.name)
                              }
                              onClick={() =>
                                setActiveService(s.name)
                              }
                              className={`
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-3
                                text-left
                                text-sm
                                font-medium
                                transition-all
                                duration-150
                                xl:px-4
                                ${
                                  isActive
                                    ? "bg-red-500 text-white shadow-sm"
                                    : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                                }
                              `}
                            >
                              {/* ICON */}

                              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                                {categoryIcon(s.name)}
                              </span>

                              {/* CATEGORY NAME */}

                              <span className="min-w-0 whitespace-nowrap">
                                {s.name.replace(" & Events", "")}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* =================================================
                        MIDDLE — EDITING SERVICES
                    ================================================= */}

                    <div
                      className="
                        min-w-0
                        bg-white
                        px-5
                        py-6
                        xl:px-6
                        2xl:px-7
                      "
                    >
                      {/* HEADER */}

                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p
                            className="
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.18em]
                              text-gray-400
                            "
                          >
                            Editing Services
                          </p>

                          <h3
                            className="
                              mt-2
                              truncate
                              text-lg
                              font-semibold
                              tracking-tight
                              text-slate-950
                              xl:text-xl
                            "
                          >
                            {activeCategory.name}
                          </h3>
                        </div>

                        <span
                          className="
                            shrink-0
                            rounded-full
                            bg-red-50
                            px-3
                            py-1
                            text-[11px]
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                            text-red-600
                          "
                        >
                          Featured
                        </span>
                      </div>

                      {/* SERVICES LIST */}

                      <div className="mt-5 grid gap-2.5">
                        {activeCategory.submenu.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setServiceOpen(false);
                              setActiveService(null);
                            }}
                            className={`
                              flex
                              min-h-[48px]
                              items-center
                              justify-between
                              gap-4
                              rounded-2xl
                              border
                              px-4
                              py-3
                              text-sm
                              transition-all
                              duration-150
                              ${
                                pathname === item.href
                                  ? "border-red-200 bg-red-50 text-red-600"
                                  : "border-gray-100 text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                              }
                            `}
                          >
                            <span className="min-w-0 truncate">
                              {item.name}
                            </span>

                            <ChevronRight
                              size={14}
                              className="shrink-0 opacity-50"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* =================================================
                        RIGHT — FEATURED SERVICE
                    ================================================= */}

                    <div
                      className="
                        flex
                        min-h-[390px]
                        flex-col
                        justify-between
                        bg-slate-950
                        p-6
                        text-white
                        xl:min-h-[420px]
                        xl:p-7
                        2xl:min-h-[440px]
                        2xl:p-8
                      "
                    >
                      <div>
                        {/* LABEL */}

                        <span
                          className="
                            inline-flex
                            rounded-full
                            bg-red-500/15
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-red-200
                          "
                        >
                          Featured Service
                        </span>

                        {/* TITLE */}

                        <h4
                          className="
                            mt-5
                            text-xl
                            font-semibold
                            tracking-tight
                            text-white
                            xl:text-2xl
                          "
                        >
                          {selectedServiceItem?.name ??
                            "Service Preview"}
                        </h4>

                        {/* DESCRIPTION */}

                        <p
                          className="
                            mt-3
                            max-w-sm
                            text-sm
                            leading-6
                            text-slate-300
                            xl:text-[0.95rem]
                            xl:leading-7
                          "
                        >
                          Explore how our{" "}
                          {activeCategory.name.toLowerCase()}{" "}
                          workflow transforms your images with sharp
                          color, clean edits, and fast delivery.
                        </p>
                      </div>

                      {/* BEFORE / AFTER */}

                      <div
                        className="
                          mt-6
                          rounded-3xl
                          border
                          border-white/10
                          bg-white/5
                          p-4
                          text-sm
                          text-slate-200
                        "
                      >
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <span
                            className="
                              text-xs
                              uppercase
                              tracking-[0.18em]
                              text-slate-400
                            "
                          >
                            Before / After
                          </span>

                          <span
                            className="
                              shrink-0
                              rounded-full
                              bg-red-500/15
                              px-2
                              py-1
                              text-[11px]
                              font-semibold
                              text-red-200
                            "
                          >
                            Live Preview
                          </span>
                        </div>

                        <div
                          className="
                            flex
                            h-32
                            items-center
                            justify-center
                            rounded-2xl
                            bg-slate-900
                            xl:h-36
                          "
                        >
                          <ImageIcon
                            size={38}
                            className="text-red-500"
                          />
                        </div>
                      </div>

                      {/* BOTTOM ACTION */}

                      <div className="mt-6 flex items-center gap-3">
                        <Link
                          href="/features"
                          onClick={() => {
                            setServiceOpen(false);
                            setActiveService(null);
                          }}
                          className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-full
                            bg-red-500
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-red-600
                          "
                        >
                          Explore Service
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* CONTACT */}

              <Link
                href="/contact-us"
                className={`whitespace-nowrap text-sm font-medium transition-colors duration-200 xl:text-[15px] ${
                  pathname === "/contact-us"
                    ? "text-red-500"
                    : "text-black hover:text-red-500"
                }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* =================================================
                DESKTOP RIGHT ACTIONS
            ================================================= */}

            <div className="hidden items-center gap-4 text-sm text-black lg:flex">
              {/* CART */}

              <Link
                href="/cart"
                className="
                  relative
                  p-2
                  text-black
                  transition-colors
                  duration-200
                  hover:text-red-500
                "
                aria-label="Cart"
              >
                <ShoppingCart size={24} />
              </Link>

              {/* ACCOUNT */}

              <Navbarfetchname />

              {/* FREE TRIAL */}

              <button
                type="button"
                onClick={() => setTrialOpen(true)}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-red-500
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-md
                  transition-all
                  duration-200
                  hover:bg-red-600
                  hover:shadow-red-500/30
                  active:bg-red-700
                "
              >
                Free Trial
              </button>
            </div>

            {/* =================================================
                MOBILE HAMBURGER
            ================================================= */}

            <button
              type="button"
              className="
                p-2
                text-gray-900
                transition-colors
                hover:text-black
                lg:hidden
              "
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* =====================================================
            MOBILE DRAWER

            IMPORTANT:
            This is completely separate from desktop mega-menu.
        ===================================================== */}

        <div
          className={`
            overflow-hidden
            transition-all
            duration-300
            lg:hidden
            ${
              mobileOpen
                ? "max-h-[calc(100dvh-5rem)]"
                : "max-h-0"
            }
          `}
        >
          <div
            className="
              max-h-[calc(100dvh-5rem)]
              overflow-y-auto
              overscroll-contain
              border-t
              border-gray-100
              bg-white
              px-4
              py-4
              sm:px-6
            "
          >
            <div className="flex flex-col gap-1">
              {/* HOME */}

              <Link
                href="/"
                onClick={closeAll}
                className="
                  border-b
                  border-gray-50
                  py-3
                  text-sm
                  font-medium
                  text-gray-900
                  transition-colors
                  hover:text-red-500
                "
              >
                Home
              </Link>

              {/* ABOUT */}

              <Link
                href="/about-us"
                onClick={closeAll}
                className="
                  border-b
                  border-gray-50
                  py-3
                  text-sm
                  font-medium
                  text-gray-900
                  transition-colors
                  hover:text-red-500
                "
              >
                About Us
              </Link>

              {/* =================================================
                  MOBILE SERVICES
              ================================================= */}

              <div className="border-b border-gray-50">
                <button
                  type="button"
                  onClick={() =>
                    setMobileServiceOpen(
                      (prev) => !prev,
                    )
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    py-3
                    text-sm
                    font-medium
                    text-gray-700
                    transition-colors
                    hover:text-red-500
                  "
                >
                  <span>Services</span>

                  {mobileServiceOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {mobileServiceOpen && (
                  <div className="flex flex-col gap-0.5 pb-2 pl-1">
                    {services.map((s) => (
                      <div key={s.name}>
                        {/* CATEGORY */}

                        <button
                          type="button"
                          onClick={() =>
                            setMobileActiveService(
                              mobileActiveService === s.name
                                ? null
                                : s.name,
                            )
                          }
                          className="
                            flex
                            w-full
                            items-center
                            justify-between
                            rounded-lg
                            px-3
                            py-2.5
                            text-left
                            text-sm
                            text-gray-600
                            transition-colors
                            hover:bg-gray-50
                            hover:text-red-500
                          "
                        >
                          <span className="pr-3">
                            {s.name}
                          </span>

                          {mobileActiveService === s.name ? (
                            <ChevronUp
                              size={14}
                              className="shrink-0"
                            />
                          ) : (
                            <ChevronDown
                              size={14}
                              className="shrink-0"
                            />
                          )}
                        </button>

                        {/* SUBMENU */}

                        {mobileActiveService === s.name && (
                          <div className="mb-1 flex flex-col gap-0.5 pl-4">
                            {s.submenu.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeAll}
                                className="
                                  flex
                                  items-start
                                  gap-2
                                  rounded-lg
                                  px-3
                                  py-2
                                  text-xs
                                  leading-5
                                  text-gray-500
                                  transition-colors
                                  hover:bg-red-50
                                  hover:text-red-500
                                "
                              >
                                <span
                                  className="
                                    mt-1.5
                                    h-1.5
                                    w-1.5
                                    shrink-0
                                    rounded-full
                                    bg-red-400
                                  "
                                />

                                <span className="min-w-0">
                                  {item.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CONTACT */}

              <Link
                href="/contact-us"
                onClick={closeAll}
                className="
                  border-b
                  border-gray-50
                  py-3
                  text-sm
                  font-medium
                  text-gray-700
                  transition-colors
                  hover:text-red-500
                "
              >
                Contact Us
              </Link>

              {/* =================================================
                  MOBILE BOTTOM ACTIONS
              ================================================= */}

              <div className="flex items-center justify-between gap-3 pt-3">
                <div className="flex min-w-0 items-center gap-3">
                  {/* CART */}

                  <Link
                    href="/cart"
                    onClick={closeAll}
                    className="
                      shrink-0
                      p-2
                      text-gray-900
                      transition-colors
                      hover:text-red-500
                    "
                    aria-label="Cart"
                  >
                    <ShoppingCart size={20} />
                  </Link>

                  {/* ACCOUNT */}

                  <div className="min-w-0">
                    <Navbarfetchname />
                  </div>
                </div>

                {/* FREE TRIAL */}

                <button
                  type="button"
                  onClick={() => {
                    setTrialOpen(true);
                    closeAll();
                  }}
                  className="
                    shrink-0
                    rounded-full
                    bg-red-500
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    hover:bg-red-600
                  "
                >
                  Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          FREE TRIAL MODAL
      ===================================================== */}

      <FreeTrialModal
        open={trialOpen}
        onClose={() => setTrialOpen(false)}
      />
    </>
  );
}

/* =============================================================
   FREE TRIAL MODAL
============================================================= */

function FreeTrialModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <>
      {/* =======================================================
          BACKDROP
      ======================================================= */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-[9998]
          bg-black/50
          backdrop-blur-sm
          transition-opacity
          duration-300
          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =======================================================
          MODAL WRAPPER
      ======================================================= */}

      <div
        className={`
          fixed
          inset-0
          z-[9999]
          flex
          items-center
          justify-center
          overflow-y-auto
          p-4
          transition-all
          duration-300
          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
        aria-hidden={!open}
      >
        {/* =====================================================
            MODAL
        ===================================================== */}

        <div
          className="
            relative
            w-full
            max-w-md
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-2xl
          "
        >
          {/* ===================================================
              HEADER
          =================================================== */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-gray-100
              px-5
              py-5
              sm:px-6
            "
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Start Your Free Trial
              </h3>

              <p className="mt-0.5 text-xs text-gray-500">
                No credit card required
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-full
                p-2
                text-gray-400
                transition-all
                hover:bg-gray-100
                hover:text-gray-600
              "
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* ===================================================
              FORM
          =================================================== */}

          <form
            className="
              flex
              flex-col
              gap-4
              px-5
              py-5
              sm:px-6
            "
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            {/* NAME */}

            <div>
              <label
                htmlFor="trial-name"
                className="
                  mb-1.5
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
                Full name
              </label>

              <input
                id="trial-name"
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Jane Doe"
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-4
                  py-2.5
                  text-sm
                  placeholder:text-gray-400
                  transition
                  focus:border-transparent
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-400
                "
              />
            </div>

            {/* EMAIL */}

            <div>
              <label
                htmlFor="trial-email"
                className="
                  mb-1.5
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
                Email address
              </label>

              <input
                id="trial-email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-4
                  py-2.5
                  text-sm
                  placeholder:text-gray-400
                  transition
                  focus:border-transparent
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-400
                "
              />
            </div>

            {/* PASSWORD */}

            <div>
              <label
                htmlFor="trial-password"
                className="
                  mb-1.5
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
                Password
              </label>

              <input
                id="trial-password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-4
                  py-2.5
                  text-sm
                  placeholder:text-gray-400
                  transition
                  focus:border-transparent
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-400
                "
              />
            </div>

            {/* REMEMBER + LOST PASSWORD */}

            <div
              className="
                flex
                flex-wrap
                items-center
                justify-between
                gap-3
                text-sm
              "
            >
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) =>
                    setRemember(e.target.checked)
                  }
                  className="
                    h-4
                    w-4
                    rounded
                    border-gray-300
                    text-red-500
                    focus:ring-red-400
                  "
                />

                <span className="text-gray-600">
                  Remember me
                </span>
              </label>

              <a
                href="#"
                className="
                  font-medium
                  text-red-500
                  hover:underline
                "
              >
                Lost Password?
              </a>
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              className="
                w-full
                rounded-xl
                bg-red-500
                py-3
                text-sm
                font-semibold
                text-white
                shadow-md
                transition-all
                hover:bg-red-600
                hover:shadow-red-500/30
              "
            >
              Create free account
            </button>

            {/* LOGIN */}

            <p className="text-center text-sm text-gray-900">
              Already have an account?{" "}
              <Link
                href="/login"
                onClick={onClose}
                className="
                  font-medium
                  text-red-500
                  hover:underline
                "
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}