"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/layout/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { Icons } from "@/components/icons";
// import {
//   useteam,
//   INDIVIDUAL_team,
// } from "@/contexts/team-context";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { toast } from "sonner";
// import { createTeam } from "@/actions/teams";
// import { useTeam } from "@/contexts/teams";

export function DashboardHeader() {
  const { data: session } = useSession();
  const user = session?.user;
  const [openTeam, setOpenTeam] = useState(false);
  const [openCreateTeam, setOpenCreateTeam] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  // const [openProject, setOpenProject] = useState(false);
  // const [projectValue, setProjectValue] = useState("");
  const router = useRouter();

  // Use the team context
  // const { teams, currentTeam, setCurrentTeam, refreshteams } = useTeam();

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
            toast.success("Successfully logged out");
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  // const handleCreateTeam = async () => {
  //   if (!newTeamName.trim()) {
  //     toast.error("team name cannot be empty");
  //     return;
  //   }

  //   setIsCreatingTeam(true);
  //   try {
  //     const result = await createTeam({ name: newTeamName.trim() });

  //     if (result.error) {
  //       toast.error(`Error: ${result.error}`);
  //       return;
  //     }

  //     if (result.data) {
  //       toast.success("team created successfully");
  //       setNewTeamName("");
  //       // Only close the dialog after successful creation
  //       setTimeout(() => {
  //         setOpenCreateTeam(false);
  //         // Refresh teams after dialog is closed
  //         setTimeout(() => {
  //           refreshteams();
  //         }, 100);
  //       }, 500);
  //     } else {
  //       toast.error("Failed to create team: No response data");
  //     }
  //   } catch (error) {
  //     let errorMessage = "Failed to create team";
  //     if (error instanceof Error) {
  //       errorMessage += `: ${error.message}`;
  //     }

  //     toast.error(errorMessage);
  //   } finally {
  //     setIsCreatingTeam(false);
  //   }
  // };

  // Get initials from user name for avatar fallback
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  // Get badge text for current team
  // const getTeamBadge = (team: typeof currentTeam) => {
  //   if (team.id === INDIVIDUAL_TEAM.id) {
  //     return "Ind";
  //   }
  //   // Get first letter of each word in team name
  //   return team.name
  //     .split(" ")
  //     .map((word) => word[0])
  //     .join("")
  //     .toUpperCase();
  // };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center px-2 py-4 md:px-8 md:py-6 max-w-full">
        <div className="flex items-center">
          <Logo
            href="/dashboard"
            className="hidden md:flex items-center px-4"
          />
          <MobileNav className="md:hidden mx-2" />

          <span className="hidden md:block font-thin text-2xl text-muted-foreground">
            /
          </span>

          {/* <Popover open={openTeam} onOpenChange={setOpenTeam}>
            <PopoverTrigger asChild className="hidden md:flex">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openTeam}
                className="justify-between border-none shadow-none"
              >
                <Badge
                  variant="outline"
                  className="bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950 rounded-md px-1.5"
                >
                  {getTeamBadge(currentTeam)}
                </Badge>
                {currentTeam.name}
                <Icons.chevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
              <Command>
                <CommandInput placeholder="Search team..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No team found.</CommandEmpty>
                  <CommandGroup heading="Your teams">
                    {teams.map((team) => (
                      <CommandItem
                        key={team.id}
                        value={team.id}
                        onSelect={() => {
                          setCurrentTeam(team);
                          setOpenTeam(false);
                        }}
                      >
                        {team.name}
                        <Icons.check
                          className={cn(
                            "ml-auto",
                            team.id === currentTeam.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        // Close the team popover first
                        setOpenTeam(false);

                        // Use setTimeout to ensure the team popover is fully closed
                        setTimeout(() => {
                          // Then open the create team dialog
                          setOpenCreateTeam(true);
                        }, 150);
                      }}
                    >
                      <Icons.add className="mr-2 size-4" />
                      Create New team
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover> */}

          {/* <Dialog
            open={openCreateTeam}
            onOpenChange={(open) => {
              // Only allow closing if we're not in the middle of creating a team
              if (!isCreatingTeam || !open) {
                setOpenCreateTeam(open);
              }
            }}
          >
            <DialogContent
              onPointerDownOutside={(e) => {
                // Prevent closing when clicking outside if creating team
                if (isCreatingTeam) {
                  e.preventDefault();
                }
              }}
              onInteractOutside={(e) => {
                // Prevent any outside interaction while creating
                if (isCreatingTeam) {
                  e.preventDefault();
                }
              }}
              className="sm:max-w-[425px]"
            >
              <DialogHeader>
                <DialogTitle>Create New team</DialogTitle>
                <DialogDescription>
                  Create a new team for your work / projects.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!isCreatingTeam && newTeamName.trim()) {
                    handleCreateTeam();
                  }
                }}
              >
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">team Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter team name"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          !isCreatingTeam &&
                          newTeamName.trim()
                        ) {
                          e.preventDefault();
                          handleCreateTeam();
                        }
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenCreateTeam(false);
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isCreatingTeam || !newTeamName.trim()}
                  >
                    {isCreatingTeam ? "Creating..." : "Create team"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog> */}

          {/* <span className="hidden md:block font-thin text-2xl text-muted-foreground">
            /
          </span> */}

          {/* Academic year selector */}
          {/* <Popover open={openAcademicYear} onOpenChange={setOpenAcademicYear}>
            <PopoverTrigger asChild className="hidden md:flex">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openAcademicYear}
                className="justify-between border-none shadow-none"
              >
                <Badge
                  variant="outline"
                  className="bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950 rounded-md px-1.5"
                >
                  AY
                </Badge>
                {academicYearValue
                  ? academicYears.find(
                      (year) => year.value === academicYearValue
                    )?.label
                  : "2024-2025"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search academic year..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No academic year found.</CommandEmpty>
                  <CommandGroup>
                    {academicYears.map((year) => (
                      <CommandItem
                        key={year.value}
                        value={year.value}
                        onSelect={(currentValue) => {
                          setAcademicYearValue(
                            currentValue === academicYearValue
                              ? ""
                              : currentValue
                          );
                          setOpenAcademicYear(false);
                        }}
                      >
                        {year.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            year.value === academicYearValue
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover> */}

          {/* Divider slash */}
          {/* <span className="hidden md:block font-thin text-2xl text-muted-foreground">
            /
          </span> */}

          {/* Semester selector */}
          {/* <Popover open={openSemester} onOpenChange={setOpenSemester}>
            <PopoverTrigger asChild className="hidden md:flex">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openSemester}
                className="justify-between border-none shadow-none"
              >
                <Badge
                  variant="outline"
                  className="bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950 rounded-md px-1.5"
                >
                  S
                </Badge>
                {semesterValue
                  ? semesters.find(
                      (semester) => semester.value === semesterValue
                    )?.label
                  : "Semester 1"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search semester..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No semester found.</CommandEmpty>
                  <CommandGroup>
                    {semesters.map((semester) => (
                      <CommandItem
                        key={semester.value}
                        value={semester.value}
                        onSelect={(currentValue) => {
                          setSemesterValue(
                            currentValue === semesterValue ? "" : currentValue
                          );
                          setOpenSemester(false);
                        }}
                      >
                        {semester.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            semester.value === semesterValue
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover> */}
        </div>

        {/* Right side controls */}
        <div className="flex flex-1 items-center justify-end">
          {/* <Button variant="ghost" size="icon" className="relative ">
            <Icons.bell className="size-4" />
            <Badge
              variant="secondary"
              className="absolute right-1 top-0 h-4 w-4 p-0"
            >
              0
            </Badge>
          </Button> */}

          {/* <Link
            href="/docs/introduction"
            className="hidden md:inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-normal transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground h-8 px-3 has-[>svg]:px-2.5"
          >
            <Icons.help className="size-4" />
          </Link> */}

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
              <Button variant="ghost" className="relative flex items-center">
                <Avatar className="size-8">
                  {user?.image ? (
                    <div className="relative aspect-square h-full w-full">
                      <Image
                        src={user.image}
                        alt={user.name ?? ""}
                        className="rounded-full object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                    </div>
                  ) : (
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || "Guest"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || "No email"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="flex items-center">
                  <Icons.user className="mr-2 size-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <Icons.logout className="mr-2 size-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
