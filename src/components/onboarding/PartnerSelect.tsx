"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

type PartnerOption = { name: string; email: string }

type PartnerSelectProps = {
  valueLabel: string
  onSearch: (term: string) => Promise<PartnerOption[]>
  onSelect: (option: PartnerOption) => void
  loading?: boolean
  error?: string
}

export function PartnerSelect({
  valueLabel,
  onSearch,
  onSelect,
  loading,
  error
}: PartnerSelectProps) {
  const [term, setTerm] = useState("")
  const [options, setOptions] = useState<PartnerOption[]>([])
  const [searching, setSearching] = useState(false)

  const handleChange = async (text: string) => {
    setTerm(text)

    if (text.trim().length < 4) {
      setOptions([])
      return
    }

    setSearching(true)
    try {
      const results = await onSearch(text.trim())
      setOptions(results)
    } catch {
      setOptions([])
    } finally {
      setSearching(false)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="partnerSearch">Email do Parceiro</Label>

      <div className="relative">
        <Input
          id="partnerSearch"
          placeholder="Pesquisar parceiro pelo nome"
          value={term || valueLabel}
          onChange={(e) => handleChange(e.target.value)}
          disabled={loading}
        />

        {searching && (
          <div className="absolute top-full left-0 right-0 mt-1 text-sm text-gray-500">
            Buscando...
          </div>
        )}

        {!searching && options.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10">
            {options.map((option) => (
              <button
                key={option.email}
                type="button"
                onClick={() => {
                  onSelect(option)
                  setTerm("")
                  setOptions([])
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 border-b last:border-b-0"
              >
                <div className="font-medium">{option.name}</div>
                <div className="text-sm text-gray-500">{option.email}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-md border border-red-200">
          {error}
        </div>
      )}
    </div>
  )
}