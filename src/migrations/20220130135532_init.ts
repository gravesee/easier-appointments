import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable("appointments", (table) => {
      table.increments("id");
      table.datetime("book_datetime").nullable();
      table.datetime("start_datetime").nullable();
      table.datetime("end_datetime").nullable();
      table.text("notes").nullable();
      table.text("hash").nullable();
      table.tinyint("is_unavailable", 4).defaultTo(0);
      table.bigint("id_users_provider").unsigned().nullable();
      table.bigint("id_users_customer").unsigned().nullable();
      table.bigint("id_services").unsigned().nullable();
      table.text("id_google_calendar").nullable();
    })
    .createTable("roles", (table) => {
      table.increments("id");
      table.string("name", 256).nullable();
      // table.string("slug", 256).nullable();
      // table.tinyint("is_admin", 4).nullable();
      // table.integer("appointments", 4).nullable();
      // table.integer("customers", 4).nullable();
      // table.integer("services", 4).nullable();
      // table.integer("users", 4).nullable();
      // table.integer("system_settings", 4).nullable();
      // table.integer("user_settings", 4).nullable();
    })
    .createTable("secretaries_providers", (table) => {
      table.bigint("id_users_secretary").unsigned();
      table.bigint("id_users_provider").unsigned();
    })
    .createTable("services", (table) => {
      table.increments("id");
      table.string("name", 256).nullable();
      table.integer("duration", 11).nullable();
      table.decimal("price", 10, 2).nullable();
      table.string("currency", 32).nullable();
      table.text("description").nullable();
      table.bigint("id_service_categories").unsigned().nullable();
    })
    .createTable("services_providers", (table) => {
      table.bigint("id_users").unsigned();
      table.bigint("id_services").unsigned();
    })
    .createTable("service_categories", (table) => {
      table.increments("id");
      table.string("name", 256).nullable();
      table.text("description").nullable();
    })
    .createTable("settings", (table) => {
      table.increments("id");
      table.string("name", 512).nullable();
      table.text("value").nullable();
    })
    .createTable("users", (table) => {
      table.increments("id");
      table.string("first_name", 256).nullable();
      table.string("last_name", 512).nullable();
      table.string("email", 512).nullable();
      table.string("mobile_number", 128).nullable();
      table.string("phone_number", 128).nullable();
      table.string("address", 256).nullable();
      table.string("city", 256).nullable();
      table.string("state", 128).nullable();
      table.string("zip_code", 64).nullable();
      table.text("notes").nullable();
      table.bigint("id_roles").unsigned().nullable();
    })
    .createTable("user_settings", (table) => {
      table.bigint("id_users");
      table.string("username", 256).nullable();
      table.string("password", 512).nullable();
      table.text("working_plan").nullable();
      table.tinyint("notifications", 4).nullable();
      table.text("google_sync").nullable();
      table.text("google_token").nullable();
      table.string("google_calendar", 128).nullable();
      table.integer("sync_past_days", 11).nullable().defaultTo(5);
      table.integer("sync_future_days", 11).nullable().defaultTo(5);
    })
    .alterTable("appointments", (table) => {
      table
        .foreign("id_users_customer")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .foreign("id_services")
        .references("id")
        .inTable("services")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .foreign("id_users_provider")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .alterTable("secretaries_providers", (table) => {
      table
        .foreign("id_users_secretary")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .foreign("id_users_provider")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .alterTable("services", (table) => {
      table
        .foreign("id_service_categories")
        .references("id")
        .inTable("service_categories")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .alterTable("services_providers", (table) => {
      table
        .foreign("id_users")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .foreign("id_services")
        .references("id")
        .inTable("services")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .alterTable("users", (table) => {
      table
        .foreign("id_roles")
        .references("id")
        .inTable("roles")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .alterTable("user_settings", (table) => {
      table
        .foreign("id_users")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });

  await knex("roles").insert([
    {
      name: "Administrator",
      // slug: "admin",
    },
    {
      name: "Provider",
      // slug: "provider",
    },
    {
      name: "Customer",
      // slug: "customer",
    },
    {
      name: "Secretary",
      // slug: "secretary",
    },
  ]);

  await knex("settings").insert([
    {
      name: "company_working_plan",
      value:
        '{"monday":{"start":"09:00","end":"18:00","breaks":[{"start":"14:30","end":"15:00"}]},"tuesday":{"start":"09:00","end":"18:00","breaks":[{"start":"14:30","end":"15:00"}]},"wednesday":{"start":"09:00","end":"18:00","breaks":[{"start":"14:30","end":"15:00"}]},"thursday":{"start":"09:00","end":"18:00","breaks":[{"start":"14:30","end":"15:00"}]},"friday":{"start":"09:00","end":"18:00","breaks":[{"start":"14:30","end":"15:00"}]},"saturday":{"start":"09:00","end":"18:00","breaks":[{"start":"14:30","end":"15:00"}]},"sunday":{"start":"09:00","end":"18:00","breaks":[{"start":"14:30","end":"15:00"}]}}',
    },
  ]);

  await knex("settings").insert([
    {
      name: "book_advance_timeout",
      value: "30",
    },
  ]);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("appointments", (table) => {
      table.dropForeign("id_users_customer");
      table.dropForeign("id_services");
      table.dropForeign("id_users_provider");
    })
    .alterTable("secretaries_providers", (table) => {
      table.dropForeign("id_users_secretary");
      table.dropForeign("id_users_provider");
    })
    .alterTable("services", (table) => {
      table.dropForeign("id_service_categories");
    })
    .alterTable("services_providers", (table) => {
      table.dropForeign("id_users");
      table.dropForeign("id_services");
    })
    .alterTable("users", (table) => {
      table.dropForeign("id_roles");
    })
    .alterTable("user_settings", (table) => {
      table.dropForeign("id_users");
    })
    .dropTable("appointments")
    .dropTable("roles")
    .dropTable("secretaries_providers")
    .dropTable("services")
    .dropTable("service_categories")
    .dropTable("services_providers")
    .dropTable("settings")
    .dropTable("user_settings")
    .dropTable("users");
}
