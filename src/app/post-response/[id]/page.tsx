import Header from '@/features/components/Header'
import ResponseForm from '@/features/components/post-response/ResponseForm'
import ProtectedRoute from '@/app/protectedRoute'

export default function AssessmentResponse() {
    return (
        <ProtectedRoute>
            <Header />
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-indigo-900 mb-8">査定回答</h1>
                <ResponseForm />
            </div>
            </div>
        </ProtectedRoute>
    )
}