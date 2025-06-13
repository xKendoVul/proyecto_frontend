import React from "react"
import BookView from "@/components/books/book-view"

type Props = {
    params: Promise<{ id: string}>
}

async function BookViewPage({ params }: Props) {
  const resolvedParams = await params
  return (
    <div>
      <BookView bookId={Number(resolvedParams.id)} />
    </div>
  )
}

export default BookViewPage