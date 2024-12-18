import ProtectedRoute from '@/app/protectedRoute'
import Header from '@/features/components/Header'
import ChatCard from '@/features/components/post-detail/ChatCard'
import ItemInfo from '@/features/components/post-detail/ItemInfo'
import ReturntoHomeButton from '@/features/ReturntoHomeButton'

export default function AssessmentDetail() {
    return (
        <ProtectedRoute>
            <Header />
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className='md:grid md:grid-cols-3'>
                        <h1 className="text-3xl font-bold text-center text-indigo-900 mb-4 md:mb-8 md:col-span-2">査定依頼詳細</h1>
                        <div className='flex mb-5 md:mb-0'>
                            <ReturntoHomeButton />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <ItemInfo />
                    </div>
                    <div className="lg:col-span-1">
                        <ChatCard />
                    </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}