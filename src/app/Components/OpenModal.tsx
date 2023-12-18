import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialogbox";
import { useProModal } from "../hooks/useOpnemodal";

const OpenModal = () => {
    const pro=useProModal();
  return (
    <div>
      <Dialog open={pro.isOpen} onOpenChange={pro.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              Done for this Account , As i Mentioned, Iam using free Account , this Convo is enough 
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpenModal;
