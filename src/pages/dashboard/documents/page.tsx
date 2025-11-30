"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DocumentsHeader } from "@/components/documents/documents-header"
import { DocumentsFilters } from "@/components/documents/documents-filters"
import { DocumentsList } from "@/components/documents/documents-list"
import { DocumentsStats } from "@/components/documents/documents-stats"
import { UploadDocumentModal } from "@/components/documents/upload-document-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function DocumentsPage() {
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("deadline")
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 h-full p-6">
        {/* Header */}
        <DocumentsHeader />

        {/* Statistics Cards */}
        <DocumentsStats />

        {/* Filters */}
        <DocumentsFilters
          filterStatus={filterStatus}
          onFilterStatusChange={setFilterStatus}
          filterCategory={filterCategory}
          onFilterCategoryChange={setFilterCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Documents List */}
        <div className="flex-1 overflow-y-auto">
          <DocumentsList status={filterStatus} category={filterCategory} sortBy={sortBy} />
        </div>

        {/* Floating Action Button (Mobile) */}
        <div className="md:hidden fixed bottom-24 right-4">
          <Button
            size="lg"
            className="rounded-full shadow-lg w-14 h-14 flex items-center justify-center bg-[var(--maple-primary)] hover:bg-[var(--maple-dark)]"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* Upload Document Modal */}
        <UploadDocumentModal isOpen={isUploadModalOpen} onOpenChange={setIsUploadModalOpen} />
      </div>
    </DashboardLayout>
  )
}
