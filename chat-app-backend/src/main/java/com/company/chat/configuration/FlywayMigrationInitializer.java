package com.company.chat.configuration;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

@Component
@Profile("dev") // Only activates in development environment
public class FlywayMigrationInitializer {

    private final Flyway flyway;

    @Autowired
    public FlywayMigrationInitializer(Flyway flyway) {
        this.flyway = flyway;
    }

    @EventListener(ContextRefreshedEvent.class)
    public void migrateFlyway() {
        // For development only - clean and migrate
        flyway.clean();
        flyway.migrate();

        // For production-safe alternative (just repair and migrate):
        // flyway.repair();
        // flyway.migrate();
    }
}