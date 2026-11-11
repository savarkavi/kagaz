"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Plus } from "lucide-react";
import { createPortfolioSchema } from "@/lib/form-validations";
import { TEMPLATES } from "@/lib/portfolio-templates";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { handleConvexError } from "@/lib/utils";

type CreatePortfolioDialogProps = {
  triggerVariant: "header" | "card";
};

export default function CreatePortfolioDialog({
  triggerVariant,
}: CreatePortfolioDialogProps) {
  const [open, setOpen] = useState(false);
  const createPortfolio = useMutation(api.portfolios.createPortfolio);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: "",
      slug: "",
      templateId: TEMPLATES[0].id,
    },
    validators: {
      onSubmit: createPortfolioSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const values = createPortfolioSchema.parse(value);

        const portfolioId = await createPortfolio({
          title: values.title,
          slug: values.slug,
          templateId: values.templateId,
        });

        setOpen(false);
        form.reset();
        router.push(`/editor/${portfolioId}`);
      } catch (error) {
        handleConvexError(error);
      }
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      form.reset();
    }

    setOpen(nextOpen);
  };

  const trigger =
    triggerVariant === "header" ? (
      <Button
        type="button"
        className="h-9 gap-2 rounded-lg px-4 text-sm font-semibold"
      >
        <Plus aria-hidden="true" className="size-4" />
        New Portfolio
      </Button>
    ) : (
      <button
        type="button"
        className="flex min-h-46 w-full flex-col items-center justify-center rounded-xl border border-muted-foreground/50 border-dashed bg-transparent px-5 text-center transition-colors hover:border-foreground/40"
      >
        <span className="mb-3 flex size-9 items-center justify-center rounded-full border bg-muted/30 text-muted-foreground">
          <Plus aria-hidden="true" className="size-4" />
        </span>
        <span className="text-sm font-medium">Create Portfolio</span>
        <span className="mt-0.5 text-xs text-muted-foreground">
          Pick a template &amp; claim a slug
        </span>
      </button>
    );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto rounded-xl p-6 sm:max-w-md">
        <DialogHeader className="mb-4 border-b pb-4 pr-8">
          <DialogTitle className="text-base font-semibold">
            Create Portfolio
          </DialogTitle>
          <DialogDescription className="text-xs">
            Set up the basics. You can change everything later.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-4">
            <form.Field name="title">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid} className="gap-1.5">
                    <FieldLabel htmlFor={field.name} className="text-xs">
                      Portfolio Title{" "}
                      <span className="text-muted-foreground">
                        (for your dashboard)
                      </span>
                    </FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      placeholder="e.g. Character Art 2026"
                      autoComplete="off"
                      className="h-10 rounded-lg bg-background px-3 text-sm"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="slug">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid} className="gap-1.5">
                    <FieldLabel htmlFor={field.name} className="text-xs">
                      URL Slug
                    </FieldLabel>
                    <div className="flex h-10 overflow-hidden rounded-lg border border-input bg-background focus-within:ring-2 focus-within:ring-ring/50">
                      <span className="flex shrink-0 items-center border-r bg-muted/40 px-3 font-mono text-xs text-muted-foreground">
                        kagaz.art/
                      </span>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={isInvalid}
                        placeholder="your-slug"
                        autoComplete="off"
                        className="h-full rounded-none border-0 bg-transparent px-3 font-mono text-sm shadow-none focus-visible:border-0 focus-visible:ring-0"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="templateId">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <FieldSet className="gap-2" data-invalid={isInvalid}>
                    <FieldLegend variant="label" className="mb-2 text-xs">
                      Starting Template
                    </FieldLegend>
                    <div
                      role="radiogroup"
                      aria-label="Starting Template"
                      className="grid grid-cols-3 gap-2"
                    >
                      {TEMPLATES.map((template) => {
                        const selected = field.state.value === template.id;

                        return (
                          <label
                            key={template.id}
                            className="relative cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={field.name}
                              value={template.id}
                              checked={selected}
                              onBlur={field.handleBlur}
                              onChange={() => field.handleChange(template.id)}
                              className="peer sr-only"
                            />
                            <span
                              className={`flex min-h-13.75 flex-col items-center justify-center rounded-lg border px-2 py-2 text-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 ${
                                selected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "bg-background hover:bg-muted/40"
                              }`}
                            >
                              <span className="font-mono text-xs font-semibold">
                                {template.id}
                              </span>
                              <span
                                className={`mt-0.5 text-[10px] ${
                                  selected
                                    ? "text-primary-foreground/75"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {template.tagline}
                              </span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldSet>
                );
              }}
            </form.Field>
          </FieldGroup>

          <Separator className="my-4" />
          <DialogFooter className="sm:flex-row">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 rounded-lg px-4"
                />
              }
            >
              Cancel
            </DialogClose>

            <form.Subscribe selector={(state) => [state.isSubmitting]}>
              {([isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-10 rounded-lg px-4 font-semibold"
                >
                  {isSubmitting ? "Creating…" : "Create & Open Editor"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
