import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="8vh"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
        alignSelf: "center",
        boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",

        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : '#FAFAFA',
          boxShadow: "1px 2px 3px rgba(0, 0, 0, 0.30)",
        },
      })}
    >
      {colorScheme === 'dark' ? (
        <SunIcon width={"30%"} height={"30%"} />
      ) : (
        <MoonIcon width={"30%"} height={"30%"} />
      )}
    </ActionIcon>
  );
}
