import Image from 'next/image'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import image from '@/public/images/IMG_0044.jpeg'

// 仮のデータ
const todaysPosts = [
    { id: 1, brand: 'ブランドA', itemName: '商品1', lastUpdated: '2023-06-10 10:30', status: '査定中', thumbnail: image },
    { id: 2, brand: 'ブランドB', itemName: '商品2', lastUpdated: '2023-06-10 11:45', status: '完了', thumbnail: image },
    { id: 3, brand: 'ブランドC', itemName: '商品3', lastUpdated: '2023-06-10 14:20', status: '査定中', thumbnail: image },
]

const ItemsList = () => {
    return (
        <div className="overflow-x-auto -mx-6 px-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[120px]">サムネイル</TableHead>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>ブランド名</TableHead>
                        <TableHead>品名</TableHead>
                        <TableHead>最終更新日時</TableHead>
                        <TableHead>ステータス</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {todaysPosts.map((post) => (
                        <TableRow key={post.id}>
                        <TableCell>
                            <Image
                            src={post.thumbnail}
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
                        <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            post.status === '完了' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {post.status}
                            </span>
                        </TableCell>
                        <TableCell><a href={`/item-detail/${post.id}`}>詳細</a></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ItemsList