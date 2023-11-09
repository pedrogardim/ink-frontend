import { useRef } from "react";
import { mdiImagePlusOutline } from "@mdi/js";
import Icon from "@mdi/react";

interface InputProps {
  imageUrl?: string;
  onChange?: (value: string) => void;
}

const ImageInput = ({}: InputProps) => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  return (
    <div
      className="btn border border-gray-700 h-32 w-32 rounded-full"
      onClick={() => (inputRef.current as HTMLInputElement).click()}
    >
      <Icon path={mdiImagePlusOutline} size={2} />
      <input className="hidden" type="file" ref={inputRef} />
    </div>
  );
};

export default ImageInput;
