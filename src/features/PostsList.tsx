import Image from 'next/image'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import image from '@/public/images/IMG_0044.jpeg'

type propsType = {
    posts : {
        id: number,
        brand: string,
        itemName: string,
        lastUpdated: string,
        status: string,
        thumbnail: string,
    }[]
}

const PostsList = ({ posts }: propsType) => {
    return (
        <div className="overflow-x-auto -mx-6 px-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[120px]">サムネイル</TableHead>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>ブランド名</TableHead>
                        <TableHead>モデル名</TableHead>
                        <TableHead>投稿日時</TableHead>
                        <TableHead>投稿者</TableHead>
                        <TableHead>ステータス</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((post) => (
                        <TableRow key={post.id}>
                        <TableCell>
                            <Image
                            src={image}
                            alt={`${post.itemName} のサムネイル`}
                            width={100}
                            height={100}
                            className="rounded-md object-cover"
                            />
                        </TableCell>
                        <TableCell className="font-medium">{post.id}</TableCell>
                        <TableCell>{post.brand}</TableCell>
                        <TableCell>{post.itemName}</TableCell>
                        <TableCell>{post.lastUpdated}</TableCell>
                        <TableCell>tesuto</TableCell>
                        <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            post.status === '完了' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {post.status}
                            </span>
                        </TableCell>
                        <TableCell><a href={`/post-detail/${post.id}`} className='border p-2'>詳細</a></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default PostsList