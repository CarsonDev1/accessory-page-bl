import Image from "next/image";
import headerPC from "../../../../public/ảnh demo header.svg"
export default function HeaderBNew() {
    return (
        <div>
            <Image src={headerPC} alt="" />
        </div>
    );
}
