import UploadForm from "@/components/upload/UploadForm"
import WaveBackground from "@/components/animations/WaveBackground"

export default function UploadPage() {
  return (
    <div className="h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 -z-10">
        <WaveBackground />
      </div>
      <div className="relative z-10">
        <UploadForm />
      </div>
    </div>
  )
}