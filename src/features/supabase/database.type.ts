export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      book_relics: {
        Row: {
          created_at: string
          id: string
          image_url: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          name?: string
        }
        Relationships: []
      }
      build_fellows: {
        Row: {
          build: string
          created_at: string
          fellow: string
          fellow_order: number
          id: string
        }
        Insert: {
          build: string
          created_at?: string
          fellow: string
          fellow_order: number
          id?: string
        }
        Update: {
          build?: string
          created_at?: string
          fellow?: string
          fellow_order?: number
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_build_fellows_build_fkey"
            columns: ["build"]
            isOneToOne: false
            referencedRelation: "builds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_build_fellows_fellow_fkey"
            columns: ["fellow"]
            isOneToOne: false
            referencedRelation: "fellows"
            referencedColumns: ["id"]
          },
        ]
      }
      build_labels: {
        Row: {
          build: string
          created_at: string
          id: string
          label: string
        }
        Insert: {
          build: string
          created_at?: string
          id?: string
          label: string
        }
        Update: {
          build?: string
          created_at?: string
          id?: string
          label?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_build_labels_build_fkey"
            columns: ["build"]
            isOneToOne: false
            referencedRelation: "builds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_build_labels_label_fkey"
            columns: ["label"]
            isOneToOne: false
            referencedRelation: "labels"
            referencedColumns: ["id"]
          },
        ]
      }
      build_skills: {
        Row: {
          build: string
          created_at: string
          delay: number
          id: string
          skill: string
          skill_order: number
        }
        Insert: {
          build: string
          created_at?: string
          delay: number
          id?: string
          skill: string
          skill_order: number
        }
        Update: {
          build?: string
          created_at?: string
          delay?: number
          id?: string
          skill?: string
          skill_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_skill_builds_build_fkey"
            columns: ["build"]
            isOneToOne: false
            referencedRelation: "builds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_skill_builds_skill_id_fkey"
            columns: ["skill"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      builds: {
        Row: {
          book_relic: string
          created_at: string
          fossil_relic: string
          id: string
          mask_relic: string
          necklace_relic: string
          owner: string
          statue_relic: string
          treasure_relic: string
          updated_at: string | null
        }
        Insert: {
          book_relic: string
          created_at?: string
          fossil_relic: string
          id?: string
          mask_relic: string
          necklace_relic: string
          owner: string
          statue_relic: string
          treasure_relic: string
          updated_at?: string | null
        }
        Update: {
          book_relic?: string
          created_at?: string
          fossil_relic?: string
          id?: string
          mask_relic?: string
          necklace_relic?: string
          owner?: string
          statue_relic?: string
          treasure_relic?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_builds_book_relic_fkey"
            columns: ["book_relic"]
            isOneToOne: false
            referencedRelation: "book_relics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_builds_fossil_relic_fkey"
            columns: ["fossil_relic"]
            isOneToOne: false
            referencedRelation: "fossil_relics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_builds_mask_relic_fkey"
            columns: ["mask_relic"]
            isOneToOne: false
            referencedRelation: "mask_relics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_builds_necklace_relic_fkey"
            columns: ["necklace_relic"]
            isOneToOne: false
            referencedRelation: "necklace_relics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_builds_statue_relic_fkey"
            columns: ["statue_relic"]
            isOneToOne: false
            referencedRelation: "statue_relics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_builds_tresure_relic_fkey"
            columns: ["treasure_relic"]
            isOneToOne: false
            referencedRelation: "treasure_relics"
            referencedColumns: ["id"]
          },
        ]
      }
      fellows: {
        Row: {
          created_at: string
          id: string
          image_url: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          name?: string
        }
        Relationships: []
      }
      fossil_relics: {
        Row: {
          created_at: string
          id: string
          image_url: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          name?: string
        }
        Relationships: []
      }
      labels: {
        Row: {
          created_at: string
          id: string
          name: string
          order: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          order: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          order?: number
        }
        Relationships: []
      }
      mask_relics: {
        Row: {
          created_at: string
          id: string
          image_url: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          name?: string
        }
        Relationships: []
      }
      necklace_relics: {
        Row: {
          created_at: string
          id: string
          image_url: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          name?: string
        }
        Relationships: []
      }
      parking_servers: {
        Row: {
          created_at: string
          id: string
          name: string
          self: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          self: boolean
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          self?: boolean
        }
        Relationships: []
      }
      parkings: {
        Row: {
          created_at: string
          id: string
          number: number
          open_at: string
          owner: string
        }
        Insert: {
          created_at?: string
          id?: string
          number: number
          open_at: string
          owner: string
        }
        Update: {
          created_at?: string
          id?: string
          number?: number
          open_at?: string
          owner?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_parkings_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "parking_servers"
            referencedColumns: ["id"]
          },
        ]
      }
      role_requests: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          status: Database["public"]["Enums"]["role_request_status"]
          user_id: string
          username: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["role_request_status"]
          user_id: string
          username: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["role_request_status"]
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_role_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          created_at: string
          id: string
          image_url: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          name?: string
        }
        Relationships: []
      }
      statue_relics: {
        Row: {
          created_at: string
          id: string
          image_url: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          name?: string
        }
        Relationships: []
      }
      treasure_relics: {
        Row: {
          created_at: string
          id: string
          image_url: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          name?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: number
          role: string
          user: string
        }
        Insert: {
          created_at?: string
          id?: number
          role: string
          user: string
        }
        Update: {
          created_at?: string
          id?: number
          role?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_user_roles_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_user_roles_user_fkey"
            columns: ["user"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_build: {
        Args: Record<PropertyKey, never>
        Returns: {
          book_relic: string
          created_at: string
          fossil_relic: string
          id: string
          mask_relic: string
          necklace_relic: string
          owner: string
          statue_relic: string
          treasure_relic: string
          updated_at: string | null
        }[]
      }
    }
    Enums: {
      role_request_status: "pending" | "accepted" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
