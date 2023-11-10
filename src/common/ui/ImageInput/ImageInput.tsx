import { useRef } from "react";
import { mdiImageEdit, mdiImagePlusOutline } from "@mdi/js";
import Icon from "@mdi/react";

interface InputProps {
  src?: string;
  onChange?: (value: string) => void;
}

const ImageInput = ({ src }: InputProps) => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  return (
    <div
      className="btn border border-gray-700 h-32 w-32 rounded-full relative"
      onClick={() => (inputRef.current as HTMLInputElement).click()}
    >
      <Icon
        path={src ? mdiImageEdit : mdiImagePlusOutline}
        size={2}
        className="pointer-events-none"
      />
      {src && (
        <img
          src={src}
          alt="image"
          className="absolute h-full w-full rounded-full hover:opacity-50 transition"
        />
      )}
      <input className="hidden" type="file" ref={inputRef} />
    </div>
  );
};

export default ImageInput;
