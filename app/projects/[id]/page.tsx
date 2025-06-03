"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Play,
  Calendar,
  Users,
  Star,
  Eye,
  Pause,
  ChevronLeft,
  ChevronRight,
  X,
  Volume2,
  VolumeX,
  Maximize,
} from "lucide-react"
import { projectsData } from "../../../data/projects"
import CustomCursor from "../../components/custom-cursor"

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const projectId = Number.parseInt(params.id as string)
  const project = projectsData.find((p) => p.id === projectId)

  // Auto-slideshow functionality
  useEffect(() => {
    if (!project || !isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === project.gallery.length - 1 ? 0 : prevIndex + 1))
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [project, isAutoPlaying])

  useEffect(() => {
    if (!project) {
      router.push("/")
    }
  }, [project, router])

  const nextImage = () => {
    if (!project) return
    setCurrentImageIndex((prevIndex) => (prevIndex === project.gallery.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    if (!project) return
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? project.gallery.length - 1 : prevIndex - 1))
  }

  const getVideoEmbedUrl = (url: string, type: string) => {
    if (type === "youtube") {
      // Convert YouTube watch URL to embed URL if needed
      if (url.includes("watch?v=")) {
        const videoId = url.split("watch?v=")[1].split("&")[0]
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}`
      }
      return url + `?autoplay=1&mute=${isMuted ? 1 : 0}`
    } else if (type === "vimeo") {
      const videoId = url.split("/").pop()
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=${isMuted ? 1 : 0}`
    }
    return url
  }

  const renderVideoPlayer = () => {
    if (!project?.videoUrl || !project?.videoType) return null

    if (project.videoType === "mp4") {
      return (
        <video
          className="w-full h-full object-contain bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-xl"
          controls
          autoPlay
          muted={isMuted}
          onLoadStart={() => setIsVideoPlaying(true)}
        >
          <source src={project.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )
    } else {
      return (
        <iframe
          className="w-full h-full rounded-lg sm:rounded-xl bg-gray-100 dark:bg-gray-800"
          src={getVideoEmbedUrl(project.videoUrl, project.videoType)}
          title={`${project.title} Demo`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )
    }
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link href="/#projects" className="text-blue-600 hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        {/* Hero Section - Enhanced */}
        <section className="relative py-8 sm:py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "4s" }}
            ></div>
          </div>

          <div className="container mx-auto relative z-10 px-4">
            {/* Back Button - Enhanced */}
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 mb-6 sm:mb-8 group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Projects</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Project Info - Enhanced */}
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4 text-sm">
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium shadow-lg text-xs sm:text-sm">
                      {project.category}
                    </span>
                    <span className="px-2 sm:px-3 py-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-400 rounded-full font-medium text-xs sm:text-sm">
                      {project.year}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 text-transparent bg-clip-text leading-tight">
                    {project.title}
                  </h1>

                  <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    {project.subtitle}
                  </p>
                </div>

                {/* Stats Cards - Mobile Optimized */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center gap-1 sm:gap-2 text-blue-600 dark:text-blue-400 mb-1">
                      <Calendar size={12} className="sm:w-4 sm:h-4" />
                      <span className="text-xs font-medium">Duration</span>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">{project.duration}</p>
                  </div>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center gap-1 sm:gap-2 text-purple-600 dark:text-purple-400 mb-1">
                      <Users size={12} className="sm:w-4 sm:h-4" />
                      <span className="text-xs font-medium">Team</span>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">{project.team}</p>
                  </div>
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center gap-1 sm:gap-2 text-green-600 dark:text-green-400 mb-1">
                      <Star size={12} className="sm:w-4 sm:h-4" />
                      <span className="text-xs font-medium">Status</span>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">{project.status}</p>
                  </div>
                </div>

                {/* Action Buttons - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                    >
                      <Github size={18} className="sm:w-5 sm:h-5" />
                      <span>View Code</span>
                      <ExternalLink
                        size={14}
                        className="sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                    >
                      <Eye size={18} className="sm:w-5 sm:h-5" />
                      <span>Live Demo</span>
                      <ExternalLink
                        size={14}
                        className="sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </a>
                  )}

                  {/* Show a message if no links are available */}
                  {!project.github && !project.live && (
                    <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-xl text-gray-600 dark:text-gray-400 text-sm text-center">
                      This project is currently in development. Links will be available soon.
                    </div>
                  )}
                </div>
              </div>

              {/* Feature Image - Mobile Optimized */}
              <div className="relative order-first lg:order-last">
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-1 sm:p-2">
                  {/* Mobile: 4:3 aspect ratio, Desktop: 16:10 aspect ratio */}
                  <div className="aspect-[4/3] sm:aspect-[16/10] rounded-lg sm:rounded-xl overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-contain bg-gray-100 dark:bg-gray-800 hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-xl sm:rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Preview Section - Mobile Optimized */}
        {project.videoUrl && (
          <section className="py-8 sm:py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 text-transparent bg-clip-text">
                    Project Demo
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Watch the project in action</p>
                </div>

                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-1 sm:p-2">
                  {/* Mobile: 16:10 aspect ratio, Desktop: 16:9 aspect ratio */}
                  <div className="aspect-[16/10] sm:aspect-video relative rounded-lg sm:rounded-xl overflow-hidden">
                    {!isVideoPlaying ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
                        <button
                          onClick={() => setIsVideoPlaying(true)}
                          className="group flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-2xl"
                        >
                          <Play size={24} className="sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-white ml-1" />
                        </button>
                        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 text-white">
                          <p className="text-base sm:text-lg lg:text-xl font-bold mb-1">Watch Demo</p>
                          <p className="text-xs sm:text-sm opacity-90">See the project in action</p>
                        </div>

                        {/* Video Controls Preview */}
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setIsMuted(!isMuted)
                            }}
                            className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          >
                            {isMuted ? (
                              <VolumeX size={14} className="sm:w-4 sm:h-4 text-white" />
                            ) : (
                              <Volume2 size={14} className="sm:w-4 sm:h-4 text-white" />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setIsVideoFullscreen(!isVideoFullscreen)
                            }}
                            className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          >
                            <Maximize size={14} className="sm:w-4 sm:h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full relative">
                        {renderVideoPlayer()}

                        {/* Video Controls Overlay */}
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-2 z-10">
                          <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="p-1.5 sm:p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                          >
                            {isMuted ? (
                              <VolumeX size={14} className="sm:w-4 sm:h-4 text-white" />
                            ) : (
                              <Volume2 size={14} className="sm:w-4 sm:h-4 text-white" />
                            )}
                          </button>
                          <button
                            onClick={() => setIsVideoPlaying(false)}
                            className="p-1.5 sm:p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                          >
                            <X size={14} className="sm:w-4 sm:h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Image Gallery - Mobile Optimized */}
        <section className="py-8 sm:py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-purple-600 dark:from-white dark:to-purple-400 text-transparent bg-clip-text">
                Project Gallery
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Auto-changing slideshow • Changes every 5 seconds
              </p>
            </div>

            {/* Main Image - Mobile Optimized */}
            <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
              <div
                className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-1 sm:p-2 group"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Mobile: 4:3 aspect ratio, Desktop: 16:9 aspect ratio */}
                <div className="aspect-[4/3] sm:aspect-video rounded-lg sm:rounded-xl overflow-hidden relative">
                  <Image
                    src={project.gallery[currentImageIndex] || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                    fill
                    className="object-contain bg-gray-100 dark:bg-gray-800 transition-all duration-500"
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                  </button>

                  {/* Play/Pause Button */}
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    {isAutoPlaying ? (
                      <Pause size={12} className="sm:w-4 sm:h-4" />
                    ) : (
                      <Play size={12} className="sm:w-4 sm:h-4" />
                    )}
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/50 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {currentImageIndex + 1} / {project.gallery.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation - Mobile Optimized */}
            <div className="flex justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 max-w-full mx-auto px-4">
              {project.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index)
                    setIsAutoPlaying(false)
                    setTimeout(() => setIsAutoPlaying(true), 3000) // Resume auto-play after 3 seconds
                  }}
                  className={`relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-md sm:rounded-lg overflow-hidden transition-all duration-300 ${
                    currentImageIndex === index
                      ? "ring-2 sm:ring-4 ring-blue-500 scale-110 shadow-lg"
                      : "hover:scale-105 opacity-70 hover:opacity-100 shadow-md"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-contain bg-gray-100 dark:bg-gray-800"
                  />
                  {currentImageIndex === index && <div className="absolute inset-0 bg-blue-500/20"></div>}
                </button>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="max-w-xs sm:max-w-md mx-auto mt-4 sm:mt-6 px-4">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentImageIndex + 1) / project.gallery.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of the component remains the same but with mobile optimizations... */}
        {/* Project Details - Mobile Optimized */}
        <section className="py-8 sm:py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6 sm:space-y-10">
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 text-transparent bg-clip-text">
                    About This Project
                  </h2>
                  <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base lg:text-lg">
                      {project.fullDescription}
                    </p>
                  </div>
                </div>

                {/* Key Features - Mobile Optimized */}
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-purple-600 dark:from-white dark:to-purple-400 text-transparent bg-clip-text">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg sm:rounded-xl border border-blue-100 dark:border-blue-800 hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges - Mobile Optimized */}
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-orange-600 dark:from-white dark:to-orange-400 text-transparent bg-clip-text">
                    Technical Challenges
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {project.challenges.map((challenge, index) => (
                      <div
                        key={index}
                        className="flex gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg sm:rounded-xl border-l-4 border-gradient-to-b from-yellow-400 to-orange-400 hover:shadow-md transition-all duration-300"
                      >
                        <span className="text-orange-600 dark:text-orange-400 font-bold text-sm sm:text-lg flex-shrink-0 bg-orange-100 dark:bg-orange-900/30 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-base">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                          {challenge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar - Mobile Optimized */}
              <div className="space-y-6 sm:space-y-8">
                {/* Technologies */}
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 lg:sticky lg:top-24">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 text-transparent bg-clip-text">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium border border-blue-200 dark:border-blue-700 hover:shadow-md transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Info */}
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-green-600 dark:from-white dark:to-green-400 text-transparent bg-clip-text">
                    Project Details
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 block mb-1">Duration</span>
                      <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{project.duration}</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 block mb-1">Team Size</span>
                      <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{project.team}</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 block mb-1">Status</span>
                      <p className="font-bold text-green-600 dark:text-green-400 text-sm sm:text-base">
                        {project.status}
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 block mb-1">Year</span>
                      <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{project.year}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Mobile Optimized */}
                {(project.github || project.live) && (
                  <div className="space-y-3 sm:space-y-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full group flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-medium hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                      >
                        <Github size={18} className="sm:w-5 sm:h-5" />
                        <span>View Source Code</span>
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full group flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-medium hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                      >
                        <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                )}

                {/* Message when no links are available */}
                {!project.github && !project.live && (
                  <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 text-transparent bg-clip-text">
                      Project Status
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      This project is currently in development. Source code and live demo links will be available soon.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects - Mobile Optimized */}
        <section className="py-8 sm:py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-purple-600 dark:from-white dark:to-purple-400 text-transparent bg-clip-text">
                More Projects
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Explore other projects in my portfolio
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {projectsData
                .filter((p) => p.id !== project.id)
                .slice(0, 2)
                .map((relatedProject) => (
                  <Link key={relatedProject.id} href={`/projects/${relatedProject.id}`}>
                    <div className="group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 dark:border-gray-700">
                      <div className="relative h-40 sm:h-48 overflow-hidden">
                        <Image
                          src={relatedProject.image || "/placeholder.svg"}
                          alt={relatedProject.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {relatedProject.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {relatedProject.subtitle}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
