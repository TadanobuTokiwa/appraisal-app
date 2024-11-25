'use client';

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Send } from 'lucide-react'

interface messageType {
    sender: string;
    message: string;
    image?: string | null;
}

const chatMessages: messageType[] = [
    { sender: "田中太郎", message: "こちらの商品の状態について詳しく教えていただけますか？" },
    { sender: "鈴木花子", message: "はい、商品は全体的に良好な状態です。若干の使用感はありますが、大きな傷や汚れは見られません。" },
]

const ChatCard = () => {

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState(chatMessages)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const sendMessage = () => {
        if (message.trim() || selectedImage) {
        setMessages([...messages, { sender: "あなた", message, image: selectedImage }])
        setMessage("")
        setSelectedImage(null)
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
            setSelectedImage(reader.result as string)
        }
        reader.readAsDataURL(file)
        }
    }

    return (
        <Card className="bg-white bg-opacity-90 h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-indigo-900">チャット(仮)</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <ScrollArea className="flex-grow mb-4 h-[calc(100vh-400px)] lg:h-[calc(100vh-300px)]">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-4">
                    <p className="font-semibold text-indigo-700">{msg.sender}</p>
                    {msg.message && <p className="bg-indigo-100 p-2 rounded-md">{msg.message}</p>}
                    {msg.image && (
                        <Dialog>
                        <DialogTrigger asChild>
                            <Image
                            src={msg.image}
                            alt="チャット画像"
                            width={200}
                            height={200}
                            className="rounded-md object-cover w-full h-40 mt-2 cursor-pointer"
                            />
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                            <Image
                            src={msg.image}
                            alt="チャット画像"
                            width={800}
                            height={800}
                            className="rounded-md object-contain w-full h-full"
                            />
                        </DialogContent>
                        </Dialog>
                    )}
                    </div>
                ))}
                </ScrollArea>
                <Separator className="my-4" />
                <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                    <Input
                    placeholder="メッセージを入力..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow mr-2"
                    />
                    <Button onClick={sendMessage}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">送信</span>
                    </Button>
                </div>
                <div className="flex items-center">
                    <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-grow mr-2"
                    />
                    {selectedImage && (
                    <Image
                        src={selectedImage}
                        alt="アップロード画像プレビュー"
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                    />
                    )}
                </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ChatCard