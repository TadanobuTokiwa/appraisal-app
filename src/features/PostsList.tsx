import Image from 'next/image'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { appraisal_posts } from '@/types/supabaseTableTypes'

type propsType = {
    posts : appraisal_posts[] | null
    loading: boolean
    currentPage?: number
    itemsPerPage?: number
}

const PostsList = ({ posts, loading, currentPage = 0, itemsPerPage = 0 }: propsType) => {

    if(currentPage && itemsPerPage && posts){
        posts = posts.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
    }

    return (
        <div className="relative overflow-x-auto -mx-6 px-6">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px] lg:w-[120px]">サムネイル</TableHead>
                        <TableHead className="w-[50px]">ID</TableHead>
                        <TableHead className='hidden sm:table-cell'>ブランド名</TableHead>
                        <TableHead className='hidden sm:table-cell'>モデル名</TableHead>
                        <TableHead className='hidden sm:table-cell'>投稿日時</TableHead>
                        <TableHead className='hidden sm:table-cell'>投稿者</TableHead>
                        <TableHead>ステータス</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts?.map((post) => {
                        const date = post.created_at.split("T")[0]
                        const time = post.created_at.split("T")[1].slice(0,5)
                        return(
                            <TableRow key={post.id}>
                            <TableCell>
                                <Image
                                src={JSON.parse(post.images)[0]}
                                alt={`${post.id} のサムネイル`}
                                width={100}
                                height={100}
                                className="rounded-md object-cover"
                                />
                            </TableCell>
                            <TableCell className="font-medium">{post.id}</TableCell>
                            <TableCell className='hidden sm:table-cell'>{post.brand}</TableCell>
                            <TableCell className='hidden sm:table-cell'>{post.modelName}</TableCell>
                            <TableCell className='hidden sm:table-cell'>{date + " " + time}</TableCell>
                            <TableCell className='hidden sm:table-cell'>{post.posterName}</TableCell>
                            <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                post.status === '対応済み' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {post.status}
                                </span>
                            </TableCell>
                            <TableCell><a href={`/post-detail/${post.id}`} className='border p-2'>詳細</a></TableCell>
                            </TableRow>
                    )})}
                </TableBody>
            </Table>
        </div>
    )
}

export default PostsList