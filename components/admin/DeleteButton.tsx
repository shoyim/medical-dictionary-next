"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteButtonProps {
  id: number;
  onDelete: (id: number) => Promise<void>;
}

export function DeleteButton({ id, onDelete }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        await onDelete(id);
        toast.success("O'chirildi", { description: "Ma'lumot muvaffaqiyatli o'chirildi." });
      } catch {
        toast.error("Xatolik", { description: "O'chirishda xatolik yuz berdi." });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
        >
          <Trash2 size={18} />
        </Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-black text-slate-900">
            Haqiqatan ham o'chirmoqchimisiz?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-500 font-medium">
            Ushbu ma'lumot tizimdan butunlay o'chiriladi. Bu amalni ortga qaytarib bo'lmaydi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="mt-4 gap-2">
          <AlertDialogCancel className="rounded-xl border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all">
            Bekor qilish
          </AlertDialogCancel>
          
          <Button
            onClick={handleConfirm}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl px-6 transition-all shadow-lg shadow-red-100"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                O'chirilmoqda...
              </>
            ) : (
              "Ha, o'chirilsin"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}