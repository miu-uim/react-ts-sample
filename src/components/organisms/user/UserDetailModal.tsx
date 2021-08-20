import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import {
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { User } from "../../../types/api/user";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

type Props = {
  user: User | null;
  isOpen: boolean; // 開いているかどうか
  isAdmin?: boolean;
  onClose: () => void; // 閉じるための関数
};

export const UserDetailModal: VFC<Props> = memo((props) => {
  // disabledとloadingは何も入ってこない可能性があるため初期値でfalseにしておく。
  const { user, isOpen, isAdmin = false, onClose } = props;

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  

  useEffect(() => {
    // undefinedの場合は空文字
    setUsername(user?.username ?? "");
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPhone(user?.phone ?? "");
  }, [user]);

  const onChangeUserName =(e:ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value)
  const onChangeName =(e:ChangeEvent<HTMLInputElement>)=>setName(e.target.value)
  const onChangeEmail =(e:ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)
  const onChangePhone =(e:ChangeEvent<HTMLInputElement>)=>setPhone(e.target.value)

  const onClickUpdate = () => alert();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay>
        <ModalContent pb={2}>
          <ModalHeader>ユーザー詳細</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={4}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>名前</FormLabel>
                {/* userはnullの可能性もあるので?がつく */}
                <Input value={username} onChange={onChangeUserName} isReadOnly={!isAdmin} />
                <FormLabel>フルネーム</FormLabel>
                <Input value={name} onChange={onChangeName} isReadOnly={!isAdmin} />
                <FormLabel>メール</FormLabel>
                <Input value={email} onChange={onChangeEmail} isReadOnly={!isAdmin} />
                <FormLabel>電話</FormLabel>
                <Input value={phone} onChange={onChangePhone} isReadOnly={!isAdmin} />
              </FormControl>
            </Stack>
          </ModalBody>
          {isAdmin && (
            <ModalFooter>
              <PrimaryButton onClick={onClickUpdate}>更新</PrimaryButton>
            </ModalFooter>
          )}
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
});
