import { useModal } from "@/shared/model";
import { Modal } from "@/shared/ui";

export const AuthVerifyModal = () => {
  const { isOpen, close } = useModal("auth");
  return (
    <Modal open={isOpen} onClose={close} className="w-[520px]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 pr-10">
          <h3 className="text-[#1A1A1A] font-bold text-3xl">
            Верификация кода
          </h3>
          <p className="text-[#6E6E73] font-medium text-base">
            Введите 4-х значный код, отправленный на мобильный номер
          </p>
          <p className="text-[#1D1D1F] font-medium">+380 97 698 6849</p>
          <button className="text-[#00CC2D] font-medium text-sm">
            Изменить номер
          </button>
        </div>
      </div>
    </Modal>
  );
};
